import MainSection from "./components/Home/MainSection";
import AzkarSection from "./components/Home/AzkarSection";
import PrayerTimingSection from "./components/Home/PrayerTimingSection";
import HadithSection from "./components/Home/HadithSection";
import QuranSection from "./components/Home/QuranSection";
export default function Home() {
  return (
    <>
      <MainSection />
      <QuranSection />
      <AzkarSection />
      <PrayerTimingSection />
      <HadithSection />

    </>
  );
}
