export interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: 'Meccan' | 'Medinan';
}

export interface Ayah {
  number: number;
  text: string;
  surah: {
    number: number;
    name: string;
  };
  numberInSurah: number;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
  sajdah: boolean;
}

export interface AyahTranslation extends Ayah {
  translation: string;
}

export interface SurahAyahs {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
  ayahs: Ayah[];
}

export interface UserSettings {
  arabicFont: 'amiri' | 'ibm-plex';
  arabicFontSize: number;
  translationFontSize: number;
}
