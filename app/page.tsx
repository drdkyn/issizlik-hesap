'use client';

import { useState } from 'react';
import { calculateUnemploymentBenefit, type MonthlyWage, type CalculationResult } from '@/lib/calculations';
import { minimumWages } from '@/lib/minimumWages';

export default function Home() {
  const [lastFourMonths, setLastFourMonths] = useState<MonthlyWage[]>([
    { year: 2026, month: 1, grossWage: 0 },
    { year: 2025, month: 12, grossWage: 0 },
    { year: 2025, month: 11, grossWage: 0 },
    { year: 2025, month: 10, grossWage: 0 },
  ]);

  const [totalInsuredDays, setTotalInsuredDays] = useState<number>(0);
  const [referenceYear, setReferenceYear] = useState<number>(2026);
  const [referenceMonth, setReferenceMonth] = useState<number>(1);
  const [result, setResult] = useState<CalculationResult | null>(null);

  const handleMonthChange = (index: number, field: string, value: string | number) => {
    const updated = [...lastFourMonths];
    if (field === 'year') {
      updated[index].year = parseInt(value as string);
    } else if (field === 'month') {
      updated[index].month = parseInt(value as string);
    } else if (field === 'grossWage') {
      updated[index].grossWage = parseFloat(value as string) || 0;
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
    setLastFourMonths([
      { year: 2026, month: 1, grossWage: 0 },
      { year: 2025, month: 12, grossWage: 0 },
      { year: 2025, month: 11, grossWage: 0 },
      { year: 2025, month: 10, grossWage: 0 },
    ]);
    setTotalInsuredDays(0);
    setReferenceYear(2026);
    setReferenceMonth(1);
    setResult(null);
  };

  const years = Array.from({ length: 20 }, (_, i) => 2026 - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Input Form */}
        <div className="space-y-6">
          <section className="section-card">
            <h2 className="text-2xl font-bold text-sgk-700 mb-6">Son 4 Ayın Brüt Kazancı</h2>
            <p className="text-sm text-sgk-600 mb-4">
              Prime esas kazancı (SGK'da kayıtlı brüt tutar) giriniz
            </p>

            <div className="space-y-4">
              {lastFourMonths.map((month, index) => (
                <div
                  key={index}
                  className="p-4 border border-sgk-200 rounded-lg bg-sgk-50"
                >
                  <p className="text-sm font-semibold text-sgk-700 mb-3">Ay {index + 1}</p>

                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div>
                      <label className="label-text">Yıl</label>
                      <select
                        value={month.year}
                        onChange={(e) => handleMonthChange(index, 'year', e.target.value)}
                        className="input-field"
                      >
                        {years.map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="label-text">Ay</label>
                      <select
                        value={month.month}
                        onChange={(e) => handleMonthChange(index, 'month', e.target.value)}
                        className="input-field"
                      >
                        {months.map((m) => (
                          <option key={m} value={m}>
                            {String(m).padStart(2, '0')}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="label-text">Brüt Kazanç (₺)</label>
                    <input
                      type="number"
                      value={month.grossWage || ''}
                      onChange={(e) => handleMonthChange(index, 'grossWage', e.target.value)}
                      placeholder="0.00"
                      step="0.01"
                      className="input-field"
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="section-card">
            <h2 className="text-xl font-bold text-sgk-700 mb-4">İşsizlik Sigortası Prim Dönemleri</h2>
            <p className="text-sm text-sgk-600 mb-4">
              Son 3 yılda sigortalı olarak çalışılan toplam gün sayısı
            </p>

            <div>
              <label className="label-text">Toplam Sigortalı Gün</label>
              <input
                type="number"
                value={totalInsuredDays || ''}
                onChange={(e) => setTotalInsuredDays(parseInt(e.target.value) || 0)}
                placeholder="0"
                className="input-field"
              />
              <div className="mt-3 p-3 bg-sgk-50 border border-sgk-200 rounded text-sm text-sgk-700">
                <p className="font-semibold mb-2">Ödenek Alma Süresi:</p>
                <ul className="space-y-1 text-xs">
                  <li>• 600 gün altı: Ödeme yapılmaz</li>
                  <li>• 600-899 gün: 180 gün</li>
                  <li>• 900-1079 gün: 240 gün</li>
                  <li>• 1080+ gün: 300 gün</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="section-card">
            <h2 className="text-xl font-bold text-sgk-700 mb-4">Hesaplama Tarihi</h2>
            <p className="text-sm text-sgk-600 mb-4">
              En yakın asgari ücret tarifesi uygulanacak tarih
            </p>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="label-text">Yıl</label>
                <select
                  value={referenceYear}
                  onChange={(e) => setReferenceYear(parseInt(e.target.value))}
                  className="input-field"
                >
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="label-text">Ay</label>
                <select
                  value={referenceMonth}
                  onChange={(e) => setReferenceMonth(parseInt(e.target.value))}
                  className="input-field"
                >
                  {months.map((m) => (
                    <option key={m} value={m}>
                      {String(m).padStart(2, '0')}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          <div className="flex gap-3">
            <button onClick={handleCalculate} className="btn-primary flex-1">
              Hesapla
            </button>
            <button onClick={handleReset} className="btn-secondary flex-1">
              Sıfırla
            </button>
          </div>
        </div>

        {/* Right Column - Results */}
        <div>
          {result ? (
            <div className="space-y-4">
              {!result.isEligible && (
                <div className="section-card bg-red-50 border-red-200">
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">⚠️</div>
                    <div>
                      <h3 className="font-bold text-red-800">Ödeneğe Hak Yok</h3>
                      <p className="text-red-700 text-sm mt-1">{result.eligibilityMessage}</p>
                    </div>
                  </div>
                </div>
              )}

              {result.isEligible && (
                <>
                  <div className="section-card bg-green-50 border-green-200">
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">✓</div>
                      <div>
                        <h3 className="font-bold text-green-800">Ödeneğe Hak Var</h3>
                        <p className="text-green-700 text-sm mt-1">{result.eligibilityMessage}</p>
                      </div>
                    </div>
                  </div>

                  <div className="section-card">
                    <h3 className="text-lg font-bold text-sgk-700 mb-4">Günlük Ödeneği</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sgk-600">Günlük ortalama kazanç:</span>
                        <span className="font-semibold">{result.dailyAverage.toLocaleString('tr-TR')} ₺</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sgk-600">Günlük ödeneği (%40):</span>
                        <span className="font-semibold">{result.dailyBenefit.toLocaleString('tr-TR')} ₺</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-sgk-200">
                        <span className="text-sgk-600">Asgari ücretin %80 (günlük):</span>
                        <span className="font-semibold text-sgk-500">{result.maxAllowedDaily.toLocaleString('tr-TR')} ₺</span>
                      </div>
                      <div className="flex justify-between bg-sgk-50 p-2 rounded border border-sgk-200 mt-2">
                        <span className="font-bold text-sgk-700">Ödenen günlük ödeneği:</span>
                        <span className="font-bold text-sgk-700">{result.cappedDailyBenefit.toLocaleString('tr-TR')} ₺</span>
                      </div>
                    </div>
                  </div>

                  <div className="section-card">
                    <h3 className="text-lg font-bold text-sgk-700 mb-4">Aylık Ödeneği</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sgk-600">Teorik aylık ödeneği:</span>
                        <span className="font-semibold">{result.monthlyBenefit.toLocaleString('tr-TR')} ₺</span>
                      </div>
                      <div className="flex justify-between bg-sgk-50 p-2 rounded border border-sgk-200">
                        <span className="font-bold text-sgk-700">Ödenen aylık ödeneği:</span>
                        <span className="font-bold text-sgk-700">{result.cappedMonthlyBenefit.toLocaleString('tr-TR')} ₺</span>
                      </div>
                    </div>
                  </div>

                  <div className="section-card">
                    <h3 className="text-lg font-bold text-sgk-700 mb-4">Ödeneği Alma Süresi</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-lg">
                        <span className="text-sgk-600">Toplam gün:</span>
                        <span className="font-bold text-sgk-700">{result.benefitDays} gün</span>
                      </div>
                      <div className="flex justify-between text-lg">
                        <span className="text-sgk-600">Toplam ay (yaklaşık):</span>
                        <span className="font-bold text-sgk-700">{(result.benefitDays / 30).toFixed(1)} ay</span>
                      </div>
                    </div>
                  </div>

                  <div className="section-card bg-blue-50 border-blue-200">
                    <h3 className="text-xl font-bold text-blue-900 mb-2">Toplam Ödeneği Tutarı</h3>
                    <p className="text-4xl font-bold text-blue-700">
                      {result.totalBenefitAmount.toLocaleString('tr-TR')} ₺
                    </p>
                    <p className="text-sm text-blue-600 mt-2">
                      {(result.cappedMonthlyBenefit * (result.benefitDays / 30)).toLocaleString('tr-TR')} ₺ 
                      ({result.benefitDays} gün × {(result.cappedMonthlyBenefit / 30).toLocaleString('tr-TR')} ₺/gün)
                    </p>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="section-card text-center py-12">
              <div className="text-6xl mb-4">📊</div>
              <h3 className="text-xl font-bold text-sgk-700 mb-2">Hesaplamaya Hazır</h3>
              <p className="text-sgk-600">
                Verileri girdikten sonra "Hesapla" düğmesine tıklayın
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Information Section */}
      <section className="section-card mt-12">
        <h2 className="text-2xl font-bold text-sgk-700 mb-4">Hukuki Çerçeve</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div>
            <h3 className="font-bold text-sgk-700 mb-2">Madde 50</h3>
            <p className="text-sgk-600">
              İşsizlik ödeneği, sigortalının son dört aylık prime esas kazançlarının günlük ortalamasının %40'ıdır. 
              Asgari ücretin %80'ini geçemez.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-sgk-700 mb-2">Madde 51</h3>
            <p className="text-sgk-600">
              Hizmet akdinin sona ermesinden önceki son 120 gün hizmet akdine tabi olanlardan, son 3 yılda:
              600+ gün = 180 gün; 900+ gün = 240 gün; 1080+ gün = 300 gün ödenek.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-sgk-700 mb-2">Madde 52</h3>
            <p className="text-sgk-600">
              Kurumca teklif edilen mesleklere uygun işi reddeden, başka işte çalışan veya emekli olan 
              kişilerin ödeneği kesilir.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
