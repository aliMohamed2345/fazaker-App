import AzkarSection from "./components/Home/LandingPage/AzkarSection";
import HadithSection from "./components/Home/LandingPage/HadithSection";
import MainSection from "./components/Home/LandingPage/MainSection";
import PrayerTimingSection from "./components/Home/LandingPage/PrayerTimingSection";
import QuranSection from "./components/Home/LandingPage/QuranSection";
export default function Home() {
  return (
    <>
      <MainSection />
      <QuranSection />
      <HadithSection />
      <PrayerTimingSection />
      <AzkarSection />

    </>
  );
}
