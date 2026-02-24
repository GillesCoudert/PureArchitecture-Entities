import type { Requester } from '@gilles-coudert/pure-architecture';
import { ResultAsync } from '@gilles-coudert/pure-trace';
import type { UpdateInput } from '../../application_boundary/use_cases/update/input';
import type { UpdateUseCase } from '../../application_boundary/use_cases/update/use_case';
import type { UpdatableEntity } from '../../domain/updatable_entity';
import type { UpdatableEntityRepository } from '../../infrastructure_boundary/persistence/updatable_entity_repository';

/**
 * Abstract interactor for updating entities.
 * Implements the template method pattern to standardize entity update flow.
 *
 * This interactor orchestrates the update process by:
 * 1. Validating input data
 * 2. Retrieving the existing entity
 * 3. Applying updates to the entity
 * 4. Persisting via repository
 * 5. Mapping to output format
 *
 * @template TRequester - The requester/actor type for access control
 * @template TEntity - The entity type (must extend UpdatableEntity)
 * @template TInputData - The input data type for updates
 * @template TUseCaseOutput - The output type returned by the use case
 * @template TId - The entity ID type (defaults to string)
 */
export abstract class UpdateInteractor<
    TRequester extends Requester,
    TEntity extends UpdatableEntity<TId>,
    TInputData,
    TUseCaseOutput,
    TId = string,
> implements UpdateUseCase<TRequester, TInputData, TUseCaseOutput, TId> {
    /**
     * Creates an instance of UpdateInteractor.
     *
     * @param {UpdatableEntityRepository<TRequester, TEntity, TId>} repository - The repository for persisting entities
     */
    constructor(
        protected readonly repository: UpdatableEntityRepository<
            TRequester,
            TEntity,
            TId
        >,
    ) {}

    /**
     * Executes the update use case.
     * This is the template method that orchestrates the update flow.
     *
     * @param {UpdateInput<TRequester, TInputData, TId>} parameters - The input parameters containing requester, entity ID, and data
     * @returns {ResultAsync<TUseCaseOutput>} The result containing the updated entity mapped to output format
     */
    execute(
        parameters: UpdateInput<TRequester, TInputData, TId>,
    ): ResultAsync<TUseCaseOutput> {
        //>
        //> > fr: Exécution du flux de mise à jour en 5 étapes via le pattern template method.
        //> > en: Execute the update flow in 5 steps via the template method pattern.
        //>
        return this.validateInput(parameters)
            .chainSuccess((validatedData) =>
                this.repository
                    .findById({
                        requester: parameters.requester,
                        id: parameters.id,
                    })
                    .chainSuccess((entity) =>
                        this.applyUpdates(entity, validatedData),
                    ),
            )
            .chainSuccess((updatedEntity) =>
                this.repository
                    .update({
                        requester: parameters.requester,
                        id: parameters.id,
                        data: updatedEntity,
                    })
                    .chainSuccess((persistedEntity) =>
                        this.mapToOutput(persistedEntity),
                    ),
            );
    }

    /**
     * Validates the input data before entity update.
     * Override this method to add custom validation logic.
     *
     * @param {UpdateInput<TRequester, TInputData, TId>} parameters - The input parameters to validate
     * @returns {ResultAsync<TInputData>} The validation result containing the validated data
     */
    protected validateInput(
        parameters: UpdateInput<TRequester, TInputData, TId>,
    ): ResultAsync<TInputData> {
        //>
        //> > fr: Par défaut, aucune validation spécifique n'est appliquée.
        //> > en: By default, no specific validation is applied.
        //>
        return ResultAsync.liftSuccess(parameters.data);
    }

    /**
     * Applies updates to the existing entity.
     * This method must be implemented by concrete interactors to define update logic.
     *
     * @param {TEntity} entity - The existing entity to update
     * @param {TInputData} data - The validated input data
     * @returns {ResultAsync<TEntity>} The result containing the updated entity
     */
    protected abstract applyUpdates(
        entity: TEntity,
        data: TInputData,
    ): ResultAsync<TEntity>;

    /**
     * Maps the updated entity to the output format.
     * This method must be implemented by concrete interactors to define output mapping logic.
     *
     * @param {TEntity} entity - The updated entity
     * @returns {ResultAsync<TUseCaseOutput>} The result containing the mapped output
     */
    protected abstract mapToOutput(
        entity: TEntity,
    ): ResultAsync<TUseCaseOutput>;
}
