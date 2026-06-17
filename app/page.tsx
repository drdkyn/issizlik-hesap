'use client';

import { useState, useEffect } from 'react';
import { calculateUnemploymentBenefit, type MonthlyWage, type CalculationResult } from '@/lib/calculations';

export default function Home() {
  const getDefaultMonths = (): MonthlyWage[] => {
    const months: MonthlyWage[] = [];
    const today = new Date();
    for (let i = 0; i < 4; i++) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
      months.push({
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        grossWage: 0,
      });
    }
    return months;
  };

  const [lastFourMonths, setLastFourMonths] = useState<MonthlyWage[]>(getDefaultMonths());
  const [totalInsuredDays, setTotalInsuredDays] = useState<number>(0);
  const [referenceYear, setReferenceYear] = useState<number>(new Date().getFullYear());
  const [referenceMonth, setReferenceMonth] = useState<number>(new Date().getMonth() + 1);
  const [result, setResult] = useState<CalculationResult | null>(null);

  const handleMonthChange = (index: number, field: string, value: string | number) => {
    const updated = [...lastFourMonths];
    if (field === 'year') {
      updated[index].year = parseInt(value as string);
    } else if (field === 'month') {
      updated[index].month = parseInt(value as string);
    } else if (field === 'grossWage') {
      const wage = parseFloat(value as string) || 0;
      updated[index].grossWage = wage;
      
      // İlk satıra yazılırsa diğerlerine de kopyala
      if (index === 0) {
        for (let i = 1; i < 4; i++) {
          updated[i].grossWage = wage;
        }
      }
    }
    setLastFourMonths(updated);
  };

  const handleCalculate = () => {
    const calc = calculateUnemploymentBenefit(
      lastFourMonths,
      totalInsuredDays,
      referenceYear,
      referenceMonth
    );
    setResult(calc);
  };

  const handleReset = () => {
    setLastFourMonths(getDefaultMonths());
    setTotalInsuredDays(0);
    setReferenceYear(new Date().getFullYear());
    setReferenceMonth(new Date().getMonth() + 1);
    setResult(null);
  };

  const years = Array.from({ length: 20 }, (_, i) => 2026 - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="space-y-2 p-3 md:p-4">
        
        {/* Son 4 Ay Brüt Kazancı - Kompakt */}
        <section className="section-card p-3 md:p-4">
          <h2 className="text-lg md:text-xl font-bold text-sgk-700 mb-2">Son 4 Ay Brüt Kazancı</h2>
          <p className="text-xs md:text-sm text-sgk-600 mb-2">İlk satıra yazınca otomatik kopyalanır</p>
          
          <div className="space-y-1.5">
            {lastFourMonths.map((month, index) => (
              <div key={index} className="grid grid-cols-5 gap-1 md:gap-2">
                {/* Yıl */}
                <select
                  value={month.year}
                  onChange={(e) => handleMonthChange(index, 'year', e.target.value)}
                  className="input-field text-xs md:text-sm p-2"
                >
                  {years.map((year) => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>

                {/* Ay */}
                <select
                  value={month.month}
                  onChange={(e) => handleMonthChange(index, 'month', e.target.value)}
                  className="input-field text-xs md:text-sm p-2"
                >
                  {months.map((m) => (
                    <option key={m} value={m}>{String(m).padStart(2, '0')}</option>
                  ))}
                </select>

                {/* Kazanç - Daha geniş */}
                <div className="col-span-3">
                  <input
                    type="number"
                    value={month.grossWage || ''}
                    onChange={(e) => handleMonthChange(index, 'grossWage', e.target.value)}
                    placeholder="₺"
                    step="0.01"
                    className="input-field text-xs md:text-sm p-2 w-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Sigortalı Gün & Referans Tarihi - Yan Yana */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <section className="section-card p-3">
            <label className="label-text text-xs md:text-sm">Toplam Sigortalı Gün (3 yıl)</label>
            <input
              type="number"
              value={totalInsuredDays || ''}
              onChange={(e) => setTotalInsuredDays(parseInt(e.target.value) || 0)}
              placeholder="0"
              className="input-field text-xs md:text-sm p-2"
            />
            <div className="mt-1 text-xs text-sgk-600">
              600→180g | 900→240g | 1080+→300g
            </div>
          </section>

          <section className="section-card p-3">
            <label className="label-text text-xs md:text-sm">Hesaplama Tarihi</label>
            <div className="grid grid-cols-2 gap-1">
              <select
                value={referenceYear}
                onChange={(e) => setReferenceYear(parseInt(e.target.value))}
                className="input-field text-xs md:text-sm p-2"
              >
                {years.map((year) => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
              <select
                value={referenceMonth}
                onChange={(e) => setReferenceMonth(parseInt(e.target.value))}
                className="input-field text-xs md:text-sm p-2"
              >
                {months.map((m) => (
                  <option key={m} value={m}>{String(m).padStart(2, '0')}</option>
                ))}
              </select>
            </div>
          </section>
        </div>

        {/* Düğmeler */}
        <div className="flex gap-2">
          <button onClick={handleCalculate} className="btn-primary flex-1 py-2 text-sm">
            Hesapla
          </button>
          <button onClick={handleReset} className="btn-secondary flex-1 py-2 text-sm">
            Sıfırla
          </button>
        </div>

        {/* SONUÇLAR - Aşağıya Taşındı */}
        {result && (
          <div className="space-y-2 mt-4">
            {!result.isEligible && (
              <div className="section-card bg-red-50 border-red-200 p-3">
                <div className="flex items-start gap-2">
                  <div className="text-xl">⚠️</div>
                  <div>
                    <h3 className="font-bold text-red-800 text-sm">Ödeneğe Hak Yok</h3>
                    <p className="text-red-700 text-xs mt-1">{result.eligibilityMessage}</p>
                  </div>
                </div>
              </div>
            )}

            {result.isEligible && (
              <>
                <div className="section-card bg-green-50 border-green-200 p-3">
                  <h3 className="font-bold text-green-800 text-sm mb-1">✓ Ödeneğe Hak Var</h3>
                  <p className="text-green-700 text-xs">{result.eligibilityMessage}</p>
                </div>

                {/* Günlük */}
                <div className="section-card p-3">
                  <h3 className="font-bold text-sgk-700 text-sm mb-2">Günlük Ödeneği</h3>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span>Günlük Ort.:</span>
                      <span className="font-semibold">{result.dailyAverage.toLocaleString('tr-TR')} ₺</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Günlük Ödenek (%40):</span>
                      <span className="font-semibold">{result.dailyBenefit.toLocaleString('tr-TR')} ₺</span>
                    </div>
                    <div className="flex justify-between border-t border-sgk-200 pt-1">
                      <span>Ödenen (sınır):</span>
                      <span className="font-bold text-sgk-700">{result.cappedDailyBenefit.toLocaleString('tr-TR')} ₺</span>
                    </div>
                  </div>
                </div>

                {/* Aylık */}
                <div className="section-card p-3">
                  <h3 className="font-bold text-sgk-700 text-sm mb-2">Aylık Ödeneği</h3>
                  <div className="flex justify-between text-sm">
                    <span>Ödenen Aylık:</span>
                    <span className="font-bold text-sgk-700">{result.cappedMonthlyBenefit.toLocaleString('tr-TR')} ₺</span>
                  </div>
                </div>

                {/* Süre */}
                <div className="section-card p-3">
                  <h3 className="font-bold text-sgk-700 text-sm mb-2">Ödeneği Alma Süresi</h3>
                  <div className="flex justify-between text-sm">
                    <span>Gün:</span>
                    <span className="font-bold">{result.benefitDays} gün ({(result.benefitDays / 30).toFixed(1)} ay)</span>
                  </div>
                </div>

                {/* NET ÖDENEĞI */}
                <div className="section-card bg-blue-50 border-blue-300 border-2 p-3">
                  <h3 className="text-sm font-bold text-blue-900 mb-2">Brüt Toplam</h3>
                  <p className="text-xs text-blue-700 mb-2">
                    {result.totalBenefitAmount.toLocaleString('tr-TR')} ₺
                  </p>
                  
                  <div className="flex justify-between text-xs mb-2 py-2 border-t border-blue-300">
                    <span className="text-blue-700">Damga Vergisi (%0,759):</span>
                    <span className="font-semibold text-red-600">-{result.stampTaxAmount.toLocaleString('tr-TR')} ₺</span>
                  </div>

                  <div className="bg-white p-2 rounded border border-blue-300 text-center">
                    <p className="text-xs font-bold text-blue-600 mb-1">NET ÖDENEĞI</p>
                    <p className="text-lg md:text-2xl font-bold text-blue-900">
                      {result.netBenefitAmount.toLocaleString('tr-TR')} ₺
                    </p>
                    <p className="text-xs text-blue-600 mt-1">Alacağı Net Ücret</p>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {!result && (
          <div className="section-card text-center py-8">
            <div className="text-4xl mb-2">📊</div>
            <p className="text-sm text-sgk-600">Verileri girdikten sonra "Hesapla"ya tıklayın</p>
          </div>
        )}
      </div>
    </div>
  );
}
