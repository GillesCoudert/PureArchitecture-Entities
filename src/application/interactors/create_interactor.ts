import type { Requester } from '@gilles-coudert/pure-architecture';
import type { Repository } from '@gilles-coudert/pure-architecture';
import { ResultAsync } from '@gilles-coudert/pure-trace';
import type { CreateInput } from '../../application_boundary/use_cases/create/input';
import type { CreateUseCase } from '../../application_boundary/use_cases/create/use_case';
import type { ImmutableEntity } from '../../domain/immutable_entity';

/**
 * Abstract interactor for creating entities.
 * Implements the template method pattern to standardize entity creation flow.
 *
 * This interactor orchestrates the creation process by:
 * 1. Validating input data
 * 2. Building the entity
 * 3. Persisting via repository
 * 4. Mapping to output format
 *
 * @template TRequester - The requester/actor type for access control
 * @template TEntity - The entity type (must extend ImmutableEntity)
 * @template TInputData - The input data type for creation
 * @template TUseCaseOutput - The output type returned by the use case
 * @template TId - The entity ID type (defaults to string)
 */
export abstract class CreateInteractor<
    TRequester extends Requester,
    TEntity extends ImmutableEntity<TId>,
    TInputData,
    TUseCaseOutput,
    TId = string,
> implements CreateUseCase<TRequester, TInputData, TUseCaseOutput> {
    /**
     * Creates an instance of CreateInteractor.
     *
     * @param {Repository<TRequester, TEntity, TId>} repository - The repository for persisting entities
     */
    constructor(
        protected readonly repository: Repository<TRequester, TEntity, TId>,
    ) {}

    /**
     * Executes the create use case.
     * This is the template method that orchestrates the creation flow.
     *
     * @param {CreateInput<TRequester, TInputData>} parameters - The input parameters containing requester and data
     * @returns {ResultAsync<TUseCaseOutput>} The result containing the created entity mapped to output format
     */
    execute(
        parameters: CreateInput<TRequester, TInputData>,
    ): ResultAsync<TUseCaseOutput> {
        //>
        //> > fr: Exécution du flux de création en 4 étapes via le pattern template method.
        //> > en: Execute the creation flow in 4 steps via the template method pattern.
        //>
        return this.validateInput(parameters)
            .chainSuccess((validatedData) => this.buildEntity(validatedData))
            .chainSuccess((entity) =>
                this.repository
                    .create({ requester: parameters.requester, data: entity })
                    .chainSuccess((createdEntity) =>
                        this.mapToOutput(createdEntity),
                    ),
            );
    }

    /**
     * Validates the input data before entity creation.
     * Override this method to add custom validation logic.
     *
     * @param {CreateInput<TRequester, TInputData>} parameters - The input parameters to validate
     * @returns {ResultAsync<TInputData>} The validation result containing the validated data
     */
    protected validateInput(
        parameters: CreateInput<TRequester, TInputData>,
    ): ResultAsync<TInputData> {
        //>
        //> > fr: Par défaut, aucune validation spécifique n'est appliquée.
        //> > en: By default, no specific validation is applied.
        //>
        return ResultAsync.liftSuccess(parameters.data);
    }

    /**
     * Builds the entity from validated input data.
     * This method must be implemented by concrete interactors to define entity construction logic.
     *
     * @param {TInputData} data - The validated input data
     * @returns {ResultAsync<TEntity>} The result containing the built entity
     */
    protected abstract buildEntity(data: TInputData): ResultAsync<TEntity>;

    /**
     * Maps the created entity to the output format.
     * This method must be implemented by concrete interactors to define output mapping logic.
     *
     * @param {TEntity} entity - The created entity
     * @returns {ResultAsync<TUseCaseOutput>} The result containing the mapped output
     */
    protected abstract mapToOutput(
        entity: TEntity,
    ): ResultAsync<TUseCaseOutput>;
}
