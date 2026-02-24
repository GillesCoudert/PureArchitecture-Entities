import type { Requester } from '@gilles-coudert/pure-architecture';
import type { Repository } from '@gilles-coudert/pure-architecture';
import { ResultAsync } from '@gilles-coudert/pure-trace';
import type { DeleteInput } from '../../application_boundary/use_cases/delete/input';
import type { DeleteUseCase } from '../../application_boundary/use_cases/delete/use_case';
import type { ImmutableEntity } from '../../domain/immutable_entity';

/**
 * Abstract interactor for permanently deleting entities.
 * Implements the template method pattern to standardize entity deletion flow.
 *
 * This interactor orchestrates the deletion process by:
 * 1. Validating the ID
 * 2. Performing pre-deletion checks
 * 3. Deleting via repository
 * 4. Performing post-deletion actions
 *
 * @template TRequester - The requester/actor type for access control
 * @template TEntity - The entity type (must extend ImmutableEntity)
 * @template TId - The entity ID type (defaults to string)
 */
export abstract class DeleteInteractor<
    TRequester extends Requester,
    TEntity extends ImmutableEntity<TId>,
    TId = string,
> implements DeleteUseCase<TRequester, TId> {
    /**
     * Creates an instance of DeleteInteractor.
     *
     * @param {Repository<TRequester, TEntity, TId>} repository - The repository for deleting entities
     */
    constructor(
        protected readonly repository: Repository<TRequester, TEntity, TId>,
    ) {}

    /**
     * Executes the delete use case.
     * This is the template method that orchestrates the deletion flow.
     *
     * @param {DeleteInput<TRequester, TId>} parameters - The input parameters containing requester and entity ID
     * @returns {ResultAsync<void>} The result indicating success or failure
     */
    execute(parameters: DeleteInput<TRequester, TId>): ResultAsync<void> {
        //>
        //> > fr: Exécution du flux de suppression en 4 étapes via le pattern template method.
        //> > en: Execute the deletion flow in 4 steps via the template method pattern.
        //>
        return this.validateId(parameters)
            .chainSuccess((_validatedId) =>
                this.performPreDeletionChecks(parameters),
            )
            .chainSuccess(() =>
                this.repository.delete({
                    requester: parameters.requester,
                    id: parameters.id,
                }),
            )
            .chainSuccess(() => this.performPostDeletionActions(parameters));
    }

    /**
     * Validates the entity ID before deletion.
     * Override this method to add custom validation logic.
     *
     * @param {DeleteInput<TRequester, TId>} parameters - The input parameters containing the ID to validate
     * @returns {ResultAsync<TId>} The validation result containing the validated ID
     */
    protected validateId(
        parameters: DeleteInput<TRequester, TId>,
    ): ResultAsync<TId> {
        //>
        //> > fr: Par défaut, aucune validation spécifique n'est appliquée.
        //> > en: By default, no specific validation is applied.
        //>
        return ResultAsync.liftSuccess(parameters.id);
    }

    /**
     * Performs pre-deletion checks (e.g., authorization, business rules).
     * Override this method to add custom pre-deletion logic.
     *
     * @param {DeleteInput<TRequester, TId>} parameters - The input parameters
     * @returns {ResultAsync<void>} The result indicating success or failure of pre-deletion checks
     */
    protected performPreDeletionChecks(
        _parameters: DeleteInput<TRequester, TId>,
    ): ResultAsync<void> {
        //>
        //> > fr: Par défaut, aucune vérification pré-suppression n'est effectuée.
        //> > en: By default, no pre-deletion checks are performed.
        //>
        return ResultAsync.liftSuccess(undefined);
    }

    /**
     * Performs post-deletion actions (e.g., cleanup, notifications).
     * Override this method to add custom post-deletion logic.
     *
     * @param {DeleteInput<TRequester, TId>} parameters - The input parameters
     * @returns {ResultAsync<void>} The result indicating success or failure of post-deletion actions
     */
    protected performPostDeletionActions(
        _parameters: DeleteInput<TRequester, TId>,
    ): ResultAsync<void> {
        //>
        //> > fr: Par défaut, aucune action post-suppression n'est effectuée.
        //> > en: By default, no post-deletion actions are performed.
        //>
        return ResultAsync.liftSuccess(undefined);
    }
}
