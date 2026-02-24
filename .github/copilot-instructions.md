# Principes généraux

## Règles qu'en tant qu'agent tu respecteras.

- Un ton professionnel et une communication claire, concise et précise tu adopteras.
- Avant de dire qu'une tâche est terminée, toujours ton code sans erreur tu compileras (npm run build).
- Avant de dire qu'une tâche est terminée, sans modifier les règles ESLint ni les altérer, ton code sans erreur tu linteras (npm run lint).
- Avant de dire qu'une tâche est terminée, si tes modifications entraînent la modification ou l'ajout de tests unitaires, toujours sans erreur les tests unitaires tu exécuteras (npm run test).
- La philosophie des librairies @gilles-coudert/pure-\* incluses dans le projet, toujours tu respecteras :
    - PureTrace :
        - Si un traitement peut échouer, toujours un Result ou un ResultAsync ta fonction retournera.
        - Pour ne pas perdre le contexte des traces, toujours les fonctions fluides tu utiliseras.
- Avec des commentaires JSDoc uniquementen anglais toujours ton code public tu documenteras.
- Avec les conventions ci-après (en français ET en anglais), commenter ton code interne à un bloc tu pourras.

```typescript
//>
//> > fr: Commentaire court sur une seule ligne.
//> > en: Short single-line comment.
//>

//>──────────────────────────────────────────────────────────────────────────────────<
//> fr: Explication d'algorithme plus détaillée sur plusieurs lignes, si nécessaire. <
//>──────────────────────────────────────────────────────────────────────────────────<
//>────────────────────────────────────────────────────────────────────────────<
//> en: More detailed algorithm explanation over multiple lines, if necessary. <
//>────────────────────────────────────────────────────────────────────────────<
```

- Aucun fichier MD non solicité (ex: CHANGELOG.md) non sollicité tu ne créeras, les fichiers MD existants si nécessaire, tu modifieras.
- Tu utilises les dernières versions des librairies et des outils, et tu ne laisses jamais de code obsolète.
- Tu ne laisses pas de répertoire vide, tu vérifies après suppression de fichiers que le répertoire parent est toujours nécessaire.

## Principes généraux de ce projet

- Ce projet apporte une surcouche à la librairie PureArchitecture, destinée à simplifier la gestion des CRUD des entités.

## Mutation contrôlée des entités (Domain/Entities)

- Les entités du domaine (Domain/Entities) peuvent modifier leur état interne via des méthodes métier (mutation contrôlée), conformément aux principes du DDD et de la Clean Architecture.
- La programmation fonctionnelle doit être appliquée principalement pour garantir que toutes les opérations retournent un `Result` ou `ResultAsync` (aucune exception lancée, aucun retour direct de Promise), afin d’auditer systématiquement les succès et échecs métier ou techniques.
- L’immuabilité stricte (retour d’une nouvelle instance à chaque modification) n’est pas requise pour les entités : il est autorisé et recommandé de modifier l’instance courante via ses méthodes métier, tant que l’état reste cohérent et encapsulé.
- Exemple :
    ```typescript
    // Correct : mutation contrôlée
    user.verifyEmail(); // Modifie l’instance courante
    ```
- Les Value Objects, en revanche, doivent rester immuables.

## Code Style

- Programmation fonctionnelle basée sur la librairie PureTrace :
    - Les codes d'erreur doivent être en camelCase et refléter l'erreur (ex: `invalidCredentials` pour une erreur d'identifiants invalides).
    - Les fonctions doivent retourner un Result (ex: `Result<User>`) dès lors qu'une opération peut échouer, ou un ResultAsync.
    - Les fonctions ne renvoient jamais de Promise, hormis les fonctions asynchrones imposées, donc pas d'usage de `async` ou `await`.
    - Les fonctions ne doivent jamais lancer d'erreur, mais plutôt retourner un Result contenant une erreur.
    - Utilise les types d'erreur `processError` pour les erreurs corrigeables par le demandeur (équivalent à un statut HTTP 4xx) ou `technicalIssue` pour les erreurs non corrigeables (équivalent à un statut HTTP 5xx).
    - Utilise les fonctions generateFailure pour créer des erreurs, jamais new Failure().
- Surcouche de la librairie PureArchitecture destinée à simplifier l'implémentation de la Clean Architecture :
    - Les éléments créés doivent hériter des classes de base fournies par la librairie (ex: `User` doit hériter de `Entity`, `AuthenticateUserUseCase` doit hériter de `PureUseCase`, etc.).
    - Les noms doivent respecter les conventions de la librairie :
        - Un contrôleur gère des Requests et retourne des Responses.
        - Un cas d'utilisation gère des Inputs et retourne des Outputs.
        - Un dépôt gère des Commands et des Queries.
- Idem pour la librairie PureArchitecture-Entities.
- Convention de nommage :
    - Pas d'abréviations dans les noms de variables, fonctions ou classes (ex: `UserProps`, `FunctionParams`).
    - Les noms des fichiers et des répertoires doivent être en snake_case, les différents concepts étant séparés par des points, et refléter le contenu du fichier (ex: `authenticated_user.ts` pour un fichier contenant une entité représentant un AuthenticateUser, `authenticated_user.dto.ts` pour un fichier contenant un DTO représentant un AuthenticateUser). Les concepts déjà dans le répertoire parent ne doivent pas être répétés (ex: `use_cases/authenticate_user.ts` et non `dto/authenticated_user.ts`).
    - Pour les interfaces :
        - Pas de préfixe `I`. Ex: `AuthenticationProvider` et non `IAuthenticationProvider`, ce sont les implémentations qui doivent porter un nom spécifique, ex: `SupabaseAuthenticationProvider`.
        - Pas de `interface` dans le nom des fichiers d'interface. Ex: `authentication_provider.ts` et non `authentication_provider.interface.ts`.
    - Ne jamais préfixer par `_`.
- Les indentations doivent être de 4 espaces, et les lignes ne doivent pas dépasser 120 caractères.

## Architecture

- Clean Architecture, sans notion héxagonale :
    - Domain : Entités, Value Objects.
    - Application : Implémentations des cas d'utilisation.
    - Application Boundary : Interfaces des cas d'utilisation.
    - Infrastructure : Pas utilisée pour l'instant.
    - Infrastructure Boundary : Interfaces des services d'infrastructure.
- DDD

## Build and Test

- Build : npm run build
- Test en Gherkin, uniquement si des fichiers non "dummy" ont été ajoutés : npm run test
- ESLint : npm run lint
