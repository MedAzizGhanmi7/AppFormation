# Application de Gestion de Formations

## Description
Cette application est une solution complète de gestion de formations développée avec **Spring Boot**, **Angular**, et **MySQL**. Elle permet de gérer les cycles, les sessions, et les utilisateurs impliqués dans les formations. Les principaux acteurs de l'application sont :

- **Administrateur** : Responsable de la gestion globale.
- **Formateur** : Gère les modules et participe aux sessions.
- **Participant** : S'inscrit aux formations disponibles.

Chaque acteur a un tableau de bord dédié adapté à ses rôles et responsabilités.

---

## Fonctionnalités

### **1. Interface d'Authentification**
- Accès sécurisé pour tous les utilisateurs.
- Page de connexion avec validation par e-mail et mot de passe.
- Lien pour accéder à la page d'inscription si un utilisateur n'a pas de compte.

### **2. Interface d'Inscription**
- Création de compte pour les **participants** et **formateurs**.
- Possibilité pour les formateurs de télécharger leur CV.

### **3. Vérification par Code**
- Confirmation de l'adresse e-mail par un code à 6 chiffres envoyé à l'utilisateur.

### **4. Tableau de Bord de l'Administrateur**
- Gestion des utilisateurs avec fonctionnalités :
  - Recherche et filtrage par rôle ou date de création.
  - Blocage/Déblocage et suppression des comptes.
  - Téléchargement des CV des formateurs.
- Gestion des cycles de formation :
  - Visualisation, ajout et modification des cycles.
  - Gestion des sessions liées aux cycles.
- Gestion des sessions :
  - Visualisation des détails.
  - Affectation des formateurs.
  - Modification et suppression des sessions.
- Création de nouveaux administrateurs sans vérification e-mail.

### **5. Interfaces pour les Participants**
- **Cycles Disponibles** : Visualisation des cycles ouverts et des sessions disponibles.
- **Participations** : Liste des sessions auxquelles le participant a participé, avec recherche et filtrage par état (fini/non fini).

### **6. Interfaces pour les Formateurs**
- **Sessions Affectées** : Liste des sessions avec recherche, filtrage par état, validation, et possibilité de créer/assigner des modules.
- **Calendrier** : Vue mensuelle, hebdomadaire ou quotidienne des sessions à l’aide de `angular-calendar`.

---

## Prérequis
- **Java 17** ou plus
- **Node.js** et **Angular CLI**
- **MySQL Server**
- **Maven** pour le backend

