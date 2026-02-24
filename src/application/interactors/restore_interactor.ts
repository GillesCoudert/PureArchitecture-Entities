import type { Requester } from '@gilles-coudert/pure-architecture';
import { ResultAsync } from '@gilles-coudert/pure-trace';
import type { RestoreInput } from '../../application_boundary/use_cases/restore/input';
import type { RestoreUseCase } from '../../application_boundary/use_cases/restore/use_case';
import type { SoftRemovableEntity } from '../../domain/soft_removable_entity';
import type { SoftRemovableEntityRepository } from '../../infrastructure_boundary/persistence/soft_removable_entity_repository';

/**
 * Abstract interactor for restoring soft deleted entities.
 * Implements the template method pattern to standardize entity restoration flow.
 *
 * This interactor orchestrates the restoration process by:
 * 1. Validating the ID
 * 2. Performing pre-restoration checks
 * 3. Restoring via repository
 * 4. Performing post-restoration actions
 *
 * @template TRequester - The requester/actor type for access control
 * @template TEntity - The entity type (must extend SoftRemovableEntity)
 * @template TId - The entity ID type (defaults to string)
 */
export abstract class RestoreInteractor<
    TRequester extends Requester,
    TEntity extends SoftRemovableEntity<TId>,
    TId = string,
> implements RestoreUseCase<TRequester, TId> {
    /**
     * Creates an instance of RestoreInteractor.
     *
     * @param {SoftRemovableEntityRepository<TRequester, TEntity, TId>} repository - The repository for restoring entities
     */
    constructor(
        protected readonly repository: SoftRemovableEntityRepository<
            TRequester,
            TEntity,
            TId
        >,
    ) {}

    /**
     * Executes the restore use case.
     * This is the template method that orchestrates the restoration flow.
     *
     * @param {RestoreInput<TRequester, TId>} parameters - The input parameters containing requester and entity ID
     * @returns {ResultAsync<void>} The result indicating success or failure
     */
    execute(parameters: RestoreInput<TRequester, TId>): ResultAsync<void> {
        //>
        //> > fr: Exécution du flux de restauration en 4 étapes via le pattern template method.
        //> > en: Execute the restoration flow in 4 steps via the template method pattern.
        //>
        return this.validateId(parameters)
            .chainSuccess((_validatedId) =>
                this.performPreRestorationChecks(parameters),
            )
            .chainSuccess(() => {
                const restoreMethod = this.repository.restore;
                if (!restoreMethod) {
                    throw new Error('restore method is not implemented');
                }
                return restoreMethod({
                    requester: parameters.requester,
                    id: parameters.id,
                });
            })
            .chainSuccess(() => this.performPostRestorationActions(parameters));
    }

    /**
     * Validates the entity ID before restoration.
     * Override this method to add custom validation logic.
     *
     * @param {RestoreInput<TRequester, TId>} parameters - The input parameters containing the ID to validate
     * @returns {ResultAsync<TId>} The validation result containing the validated ID
     */
    protected validateId(
        parameters: RestoreInput<TRequester, TId>,
    ): ResultAsync<TId> {
        //>
        //> > fr: Par défaut, aucune validation spécifique n'est appliquée.
        //> > en: By default, no specific validation is applied.
        //>
        return ResultAsync.liftSuccess(parameters.id);
    }

    /**
     * Performs pre-restoration checks (e.g., authorization, business rules).
     * Override this method to add custom pre-restoration logic.
     *
     * @param {RestoreInput<TRequester, TId>} parameters - The input parameters
     * @returns {ResultAsync<void>} The result indicating success or failure of pre-restoration checks
     */
    protected performPreRestorationChecks(
        _parameters: RestoreInput<TRequester, TId>,
    ): ResultAsync<void> {
        //>
        //> > fr: Par défaut, aucune vérification pré-restauration n'est effectuée.
        //> > en: By default, no pre-restoration checks are performed.
        //>
        return ResultAsync.liftSuccess(undefined);
    }

    /**
     * Performs post-restoration actions (e.g., cleanup, notifications).
     * Override this method to add custom post-restoration logic.
     *
     * @param {RestoreInput<TRequester, TId>} parameters - The input parameters
     * @returns {ResultAsync<void>} The result indicating success or failure of post-restoration actions
     */
    protected performPostRestorationActions(
        _parameters: RestoreInput<TRequester, TId>,
    ): ResultAsync<void> {
        //>
        //> > fr: Par défaut, aucune action post-restauration n'est effectuée.
        //> > en: By default, no post-restoration actions are performed.
        //>
        return ResultAsync.liftSuccess(undefined);
    }
}
