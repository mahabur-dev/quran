import { Surah, AyahTranslation, SurahAyahs } from './types';

// const API_BASE = 'https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions';
const API_BASE = 'https://api.alquran.cloud/v1/surah';

/**
 * Fetch all Surahs metadata
 */
// {API_BASE}/quran-uthmani.json
// export async function getAllSurahs(): Promise<Surah[]> {
//   try {
//     const response = await fetch(
//       'https://api.alquran.cloud/v1/surah',
//       {
//         next: { revalidate: 86400 } // Cache for 24 hours
//       }
//     );

//     if (!response.ok) {
//       throw new Error(`Failed to fetch surahs: ${response.statusText}`);
//     }

//     const data = await response.json();
//     return data.surahs;
//   } catch (error) {
//     console.error('Error fetching surahs:', error);
//     throw error;
//   }
// }
export async function getAllSurahs(): Promise<Surah[]> {
  const response = await fetch(
    'https://api.alquran.cloud/v1/surah',
    { next: { revalidate: 86400 } }
  );
  const data = await response.json();
  return data.data;  // ⚠️ Note: it's 'data.data', not 'data.surahs'
}


/**
 * Fetch a specific Surah with English translations
 */
// export async function getSurahWithTranslation(
//   surahNumber: number
// ): Promise<{ arabic: SurahAyahs; english: SurahAyahs } | null> {
//   try {
//     const [arabicRes, englishRes] = await Promise.all([
//       fetch(`${API_BASE}/quran-uthmani.json`, {
//         next: { revalidate: 86400 },
//       }),
//       fetch(`${API_BASE}/quran-en-sahih.json`, {
//         next: { revalidate: 86400 },
//       }),
//     ]);

//     if (!arabicRes.ok || !englishRes.ok) {
//       throw new Error('Failed to fetch surah data');
//     }

//     const arabicData = await arabicRes.json();
//     const englishData = await englishRes.json();

//     const arabicSurah = arabicData.surahs.find(
//       (s: Surah) => s.number === surahNumber
//     );
//     const englishSurah = englishData.surahs.find(
//       (s: Surah) => s.number === surahNumber
//     );

//     if (!arabicSurah || !englishSurah) {
//       return null;
//     }

//     return {
//       arabic: arabicSurah,
//       english: englishSurah,
//     };
//   } catch (error) {
//     console.error(`Error fetching surah ${surahNumber}:`, error);
//     throw error;
//   }
// }
export async function getSurahWithTranslation(surahNumber: number) {
  const response = await fetch(
    `https://api.alquran.cloud/v1/surah/${surahNumber}/editions/en.sahih,ar.alafasy`
  );
  const data = await response.json();
  return data.data;  // Contains ayahs array with Arabic + English translation
}


/**
 * Get all Ayahs from a Surah with translations
 */
export async function getSurahAyahs(
  surahNumber: number
): Promise<AyahTranslation[] | null> {
  try {
    const result = await getSurahWithTranslation(surahNumber);

    if (!result) {
      return null;
    }

    const { arabic, english } = result;

    // Combine Arabic and English ayahs
    const ayahs: AyahTranslation[] = arabic.ayahs.map(
      (arabicAyah: any, index: number) => ({
        ...arabicAyah,
        translation: english.ayahs[index]?.text || '',
      })
    );

    return ayahs;
  } catch (error) {
    console.error(`Error fetching ayahs for surah ${surahNumber}:`, error);
    throw error;
  }
}

/**
 * Search through all Ayahs in a translation
 */
export async function searchAyahs(query: string): Promise<AyahTranslation[]> {
  try {
    const response = await fetch(`${API_BASE}/quran-en-sahih.json`, {
      next: { revalidate: 86400 },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch quran data');
    }

    const data = await response.json();
    const results: AyahTranslation[] = [];
    const lowerQuery = query.toLowerCase();

    // Search through all surahs and ayahs
    for (const surah of data.surahs) {
      for (const ayah of surah.ayahs) {
        if (ayah.text.toLowerCase().includes(lowerQuery)) {
          results.push({
            ...ayah,
            translation: ayah.text,
          });

          // Limit results to 50
          if (results.length >= 50) {
            return results;
          }
        }
      }
    }

    return results;
  } catch (error) {
    console.error('Error searching ayahs:', error);
    throw error;
  }
}
