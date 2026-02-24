import type { Requester } from '@gilles-coudert/pure-architecture';
import { ResultAsync } from '@gilles-coudert/pure-trace';
import type { SoftDeleteInput } from '../../application_boundary/use_cases/soft_delete/input';
import type { SoftDeleteUseCase } from '../../application_boundary/use_cases/soft_delete/use_case';
import type { SoftRemovableEntity } from '../../domain/soft_removable_entity';
import type { SoftRemovableEntityRepository } from '../../infrastructure_boundary/persistence/soft_removable_entity_repository';

/**
 * Abstract interactor for soft deleting entities.
 * Implements the template method pattern to standardize entity soft deletion flow.
 *
 * This interactor orchestrates the soft deletion process by:
 * 1. Validating the ID
 * 2. Performing pre-soft-deletion checks
 * 3. Soft deleting via repository
 * 4. Performing post-soft-deletion actions
 *
 * @template TRequester - The requester/actor type for access control
 * @template TEntity - The entity type (must extend SoftRemovableEntity)
 * @template TId - The entity ID type (defaults to string)
 */
export abstract class SoftDeleteInteractor<
    TRequester extends Requester,
    TEntity extends SoftRemovableEntity<TId>,
    TId = string,
> implements SoftDeleteUseCase<TRequester, TId> {
    /**
     * Creates an instance of SoftDeleteInteractor.
     *
     * @param {SoftRemovableEntityRepository<TRequester, TEntity, TId>} repository - The repository for soft deleting entities
     */
    constructor(
        protected readonly repository: SoftRemovableEntityRepository<
            TRequester,
            TEntity,
            TId
        >,
    ) {}

    /**
     * Executes the soft delete use case.
     * This is the template method that orchestrates the soft deletion flow.
     *
     * @param {SoftDeleteInput<TRequester, TId>} parameters - The input parameters containing requester and entity ID
     * @returns {ResultAsync<void>} The result indicating success or failure
     */
    execute(parameters: SoftDeleteInput<TRequester, TId>): ResultAsync<void> {
        //>
        //> > fr: Exécution du flux de suppression douce en 4 étapes via le pattern template method.
        //> > en: Execute the soft deletion flow in 4 steps via the template method pattern.
        //>
        return this.validateId(parameters)
            .chainSuccess((_validatedId) =>
                this.performPreSoftDeletionChecks(parameters),
            )
            .chainSuccess(() => {
                const softDeleteMethod = this.repository.softDelete;
                if (!softDeleteMethod) {
                    throw new Error('softDelete method is not implemented');
                }
                return softDeleteMethod({
                    requester: parameters.requester,
                    id: parameters.id,
                });
            })
            .chainSuccess(() =>
                this.performPostSoftDeletionActions(parameters),
            );
    }

    /**
     * Validates the entity ID before soft deletion.
     * Override this method to add custom validation logic.
     *
     * @param {SoftDeleteInput<TRequester, TId>} parameters - The input parameters containing the ID to validate
     * @returns {ResultAsync<TId>} The validation result containing the validated ID
     */
    protected validateId(
        parameters: SoftDeleteInput<TRequester, TId>,
    ): ResultAsync<TId> {
        //>
        //> > fr: Par défaut, aucune validation spécifique n'est appliquée.
        //> > en: By default, no specific validation is applied.
        //>
        return ResultAsync.liftSuccess(parameters.id);
    }

    /**
     * Performs pre-soft-deletion checks (e.g., authorization, business rules).
     * Override this method to add custom pre-soft-deletion logic.
     *
     * @param {SoftDeleteInput<TRequester, TId>} parameters - The input parameters
     * @returns {ResultAsync<void>} The result indicating success or failure of pre-soft-deletion checks
     */
    protected performPreSoftDeletionChecks(
        _parameters: SoftDeleteInput<TRequester, TId>,
    ): ResultAsync<void> {
        //>
        //> > fr: Par défaut, aucune vérification pré-suppression douce n'est effectuée.
        //> > en: By default, no pre-soft-deletion checks are performed.
        //>
        return ResultAsync.liftSuccess(undefined);
    }

    /**
     * Performs post-soft-deletion actions (e.g., cleanup, notifications).
     * Override this method to add custom post-soft-deletion logic.
     *
     * @param {SoftDeleteInput<TRequester, TId>} parameters - The input parameters
     * @returns {ResultAsync<void>} The result indicating success or failure of post-soft-deletion actions
     */
    protected performPostSoftDeletionActions(
        _parameters: SoftDeleteInput<TRequester, TId>,
    ): ResultAsync<void> {
        //>
        //> > fr: Par défaut, aucune action post-suppression douce n'est effectuée.
        //> > en: By default, no post-soft-deletion actions are performed.
        //>
        return ResultAsync.liftSuccess(undefined);
    }
}
