export interface AyahOptionsProps {
    IsOpen: boolean;
    AudioSrc: string;
    Ayah: string;
    SurahNumber: number;
    AyahNumber: number;
    SurahName: string;
}
export const removeFromLocalStorage = (ayahNumber: number, surahNumber: number) => {
    let savedAyahs = getSavedAyahsFromLocalStorage();
    savedAyahs = savedAyahs.filter((ayah: any) => ayah.ayahNumber !== ayahNumber || ayah.surahNumber !== surahNumber);
    localStorage.setItem("savedAyahs", JSON.stringify(savedAyahs));
};
// Function to retrieve saved Ayahs from localStorage
export const getSavedAyahsFromLocalStorage = (): any[] => {
    return JSON.parse(localStorage.getItem("savedAyahs") || "[]");
};
// Function to save or update the array of Ayahs in localStorage
export const saveToLocalStorage = (ayahObject: any) => {
    let savedAyahs = getSavedAyahsFromLocalStorage();

    // Check if ayah already exists
    const ayahExists = savedAyahs.some((ayah: any) => ayah.ayahNumber === ayahObject.ayahNumber && ayah.surahNumber === ayahObject.surahNumber);

    if (!ayahExists) {
        savedAyahs.push(ayahObject); // Add the new ayah
        localStorage.setItem("savedAyahs", JSON.stringify(savedAyahs)); // Update localStorage
    }
};
// Function to check if an Ayah is already saved
export const isAyahSaved = (ayahNumber: number, surahNumber: number): boolean => {
    let savedAyahs = getSavedAyahsFromLocalStorage();
    return savedAyahs.some((ayah: any) => ayah.ayahNumber === ayahNumber && ayah.surahNumber === surahNumber);
};
export const handlePlayBtn = (
    AudioRef: React.RefObject<HTMLAudioElement>,
    IsPlaying: boolean,
    SetIsPlaying: React.Dispatch<React.SetStateAction<boolean>>
) => {
    if (AudioRef.current) {
        if (!IsPlaying) {
            AudioRef.current.play();
        } else {
            AudioRef.current.pause();
        }
        SetIsPlaying((prev) => !prev);
    }
};