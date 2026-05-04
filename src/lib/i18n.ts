import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "app": {
        "title": "EliteCV",
        "subtitle": "Modern CV Generator"
      },
      "editor": {
        "personalInfo": "Personal Information",
        "about": "About / Summary",
        "workExperience": "Work Experience",
        "education": "Education",
        "skills": "Skills",
        "projects": "Projects",
        "certifications": "Certifications",
        "languages": "Languages",
        "add": "Add {{item}}",
        "remove": "Remove",
        "field": {
          "fullName": "Full Name",
          "jobTitle": "Job Title",
          "email": "Email",
          "phone": "Phone",
          "location": "Location",
          "website": "Website",
          "linkedin": "LinkedIn",
          "github": "GitHub",
          "company": "Company",
          "position": "Position",
          "startDate": "Start Date",
          "endDate": "End Date",
          "current": "I am currently working here",
          "description": "Description",
          "institution": "Institution",
          "degree": "Degree",
          "skillName": "Skill Name",
          "skillLevel": "Level",
          "projectName": "Project Name",
          "projectLink": "Project Link",
          "technologies": "Technologies (comma separated)",
          "certName": "Certification Name",
          "certIssuer": "Issuer",
          "certDate": "Date",
          "langName": "Language",
          "langLevel": "Proficiency"
        }
      },
      "preview": {
        "livePreview": "Live Preview",
        "downloadPdf": "Download PDF",
        "templates": "Templates",
        "switchLanguage": "Switch Language",
        "themeColor": "Theme Color",
        "present": "Present"
      },
      "ai": {
        "generateSummary": "AI Summarize",
        "generating": "Generating...",
        "error": "AI could not generate summary. Check API key."
      }
    }
  },
  fr: {
    translation: {
      "app": {
        "title": "EliteCV",
        "subtitle": "Générateur de CV Moderne"
      },
      "editor": {
        "personalInfo": "Informations Personnelles",
        "about": "À propos / Résumé",
        "workExperience": "Expérience Professionnelle",
        "education": "Formation",
        "skills": "Compétences",
        "projects": "Projets",
        "certifications": "Certifications",
        "languages": "Langues",
        "add": "Ajouter {{item}}",
        "remove": "Supprimer",
        "field": {
          "fullName": "Nom Complet",
          "jobTitle": "Intitulé du Poste",
          "email": "Email",
          "phone": "Téléphone",
          "location": "Localisation",
          "website": "Site Web",
          "linkedin": "LinkedIn",
          "github": "GitHub",
          "company": "Entreprise",
          "position": "Poste",
          "startDate": "Date de Début",
          "endDate": "Date de Fin",
          "current": "J'occupe actuellement ce poste",
          "description": "Description",
          "institution": "Institution",
          "degree": "Diplôme",
          "skillName": "Nom de la Compétence",
          "skillLevel": "Niveau",
          "projectName": "Nom du Projet",
          "projectLink": "Lien du Projet",
          "technologies": "Technologies (séparées par des virgules)",
          "certName": "Nom de la Certification",
          "certIssuer": "Émetteur",
          "certDate": "Date",
          "langName": "Langue",
          "langLevel": "Niveau de Maîtrise"
        }
      },
      "preview": {
        "livePreview": "Aperçu en Direct",
        "downloadPdf": "Télécharger PDF",
        "templates": "Modèles",
        "switchLanguage": "Changer de Langue",
        "themeColor": "Couleur du Thème",
        "present": "Présent"
      },
      "ai": {
        "generateSummary": "Résumé IA",
        "generating": "Génération...",
        "error": "L'IA n'a pas pu générer le résumé. Vérifiez la clé API."
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
