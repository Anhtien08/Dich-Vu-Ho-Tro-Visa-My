/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { AssessmentScreen } from './components/AssessmentScreen';
import { FloatingContactButtons } from './components/FloatingContactButtons';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { OverviewScreen } from './components/OverviewScreen';
import { PathwaysScreen } from './components/PathwaysScreen';
import { CONSULATES } from './data/visaData';
import {
  AppScreen,
  ClientDossier,
  Language,
  VisaCategoryId,
} from './types/visa';

const STORAGE_KEY_LANG = 'visa5s_lang_v2';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<AppScreen>('overview');
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_LANG);
    return saved === 'en' ? 'en' : 'vi';
  });

  const [assessmentSeed, setAssessmentSeed] = useState<{
    visaId: VisaCategoryId;
    consulate: string;
    priorRefusal: boolean;
  }>({
    visaId: 'tourism',
    consulate: CONSULATES[0],
    priorRefusal: false,
  });

  const handleChangeLanguage = (lang: Language) => {
    setLanguage(lang);
    try {
      localStorage.setItem(STORAGE_KEY_LANG, lang);
    } catch {
      // ignore
    }
  };

  const handleStartAssessmentWith = (
    visaId: VisaCategoryId,
    consulate: string,
    priorRefusal: boolean
  ) => {
    setAssessmentSeed({ visaId, consulate, priorRefusal });
    setActiveScreen('assessment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCreateDossier = (_newDossier: ClientDossier) => {
    // Assessment dossier summary is displayed directly in Step 4
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A]">
      <Navbar
        activeScreen={activeScreen}
        onNavigate={setActiveScreen}
        language={language}
      />

      <main className="flex-1">
        {activeScreen === 'overview' && (
          <OverviewScreen
            language={language}
            onChangeLanguage={handleChangeLanguage}
            onNavigate={setActiveScreen}
            onStartAssessmentWith={handleStartAssessmentWith}
          />
        )}

        {activeScreen === 'pathways' && (
          <PathwaysScreen
            language={language}
            onSelectForAssessment={handleStartAssessmentWith}
          />
        )}

        {activeScreen === 'assessment' && (
          <AssessmentScreen
            language={language}
            initialVisaId={assessmentSeed.visaId}
            initialConsulate={assessmentSeed.consulate}
            initialPriorRefusal={assessmentSeed.priorRefusal}
            onCreateDossier={handleCreateDossier}
            onViewServices={() => {
              setActiveScreen('pathways');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </main>

      <Footer
        language={language}
        onChangeLanguage={handleChangeLanguage}
        onNavigate={setActiveScreen}
      />

      <FloatingContactButtons language={language} />
    </div>
  );
}
