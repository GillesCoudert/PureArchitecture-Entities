import type { Requester } from '@gilles-coudert/pure-architecture';
import type { Repository } from '@gilles-coudert/pure-architecture';
import { ResultAsync } from '@gilles-coudert/pure-trace';
import type { FindByIdInput } from '../../application_boundary/use_cases/find_by_id/input';
import type { FindByIdUseCase } from '../../application_boundary/use_cases/find_by_id/use_case';
import type { ImmutableEntity } from '../../domain/immutable_entity';

/**
 * Abstract interactor for finding an entity by ID.
 * Implements the template method pattern to standardize entity retrieval flow.
 *
 * This interactor orchestrates the find-by-id process by:
 * 1. Validating the ID
 * 2. Retrieving the entity from repository
 * 3. Mapping to output format
 *
 * @template TRequester - The requester/actor type for access control
 * @template TEntity - The entity type (must extend ImmutableEntity)
 * @template TUseCaseOutput - The output type returned by the use case
 * @template TId - The entity ID type (defaults to string)
 */
export abstract class FindByIdInteractor<
    TRequester extends Requester,
    TEntity extends ImmutableEntity<TId>,
    TUseCaseOutput,
    TId = string,
> implements FindByIdUseCase<TRequester, TUseCaseOutput, TId> {
    /**
     * Creates an instance of FindByIdInteractor.
     *
     * @param {Repository<TRequester, TEntity, TId>} repository - The repository for retrieving entities
     */
    constructor(
        protected readonly repository: Repository<TRequester, TEntity, TId>,
    ) {}

    /**
     * Executes the find-by-id use case.
     * This is the template method that orchestrates the retrieval flow.
     *
     * @param {FindByIdInput<TRequester, TId>} parameters - The input parameters containing requester and entity ID
     * @returns {ResultAsync<TUseCaseOutput>} The result containing the found entity mapped to output format
     */
    execute(
        parameters: FindByIdInput<TRequester, TId>,
    ): ResultAsync<TUseCaseOutput> {
        //>
        //> > fr: Exécution du flux de recherche en 3 étapes via le pattern template method.
        //> > en: Execute the search flow in 3 steps via the template method pattern.
        //>
        return this.validateId(parameters)
            .chainSuccess((validatedId) =>
                this.repository.findById({
                    requester: parameters.requester,
                    id: validatedId,
                }),
            )
            .chainSuccess((entity) => this.mapToOutput(entity));
    }

    /**
     * Validates the entity ID before retrieval.
     * Override this method to add custom validation logic.
     *
     * @param {FindByIdInput<TRequester, TId>} parameters - The input parameters containing the ID to validate
     * @returns {ResultAsync<TId>} The validation result containing the validated ID
     */
    protected validateId(
        parameters: FindByIdInput<TRequester, TId>,
    ): ResultAsync<TId> {
        //>
        //> > fr: Par défaut, aucune validation spécifique n'est appliquée.
        //> > en: By default, no specific validation is applied.
        //>
        return ResultAsync.liftSuccess(parameters.id);
    }

    /**
     * Maps the found entity to the output format.
     * This method must be implemented by concrete interactors to define output mapping logic.
     *
     * @param {TEntity} entity - The found entity
     * @returns {ResultAsync<TUseCaseOutput>} The result containing the mapped output
     */
    protected abstract mapToOutput(
        entity: TEntity,
    ): ResultAsync<TUseCaseOutput>;
}
