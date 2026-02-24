import type { Requester, PageResult } from '@gilles-coudert/pure-architecture';
import { ResultAsync } from '@gilles-coudert/pure-trace';
import type { FindAllInput } from '../../application_boundary/use_cases/find_all/input';
import type { FindAllUseCase } from '../../application_boundary/use_cases/find_all/use_case';
import type { ImmutableEntity } from '../../domain/immutable_entity';
import type { Repository } from '@gilles-coudert/pure-architecture';

/**
 * Abstract interactor for finding all entities with pagination and filtering.
 * Implements the template method pattern to standardize entity listing flow.
 *
 * This interactor orchestrates the find-all process by:
 * 1. Validating query parameters
 * 2. Retrieving entities from repository
 * 3. Mapping to output format
 *
 * @template TRequester - The requester/actor type for access control
 * @template TEntity - The entity type (must extend ImmutableEntity)
 * @template TUseCaseOutputData - The output data type for each entity in the result
 * @template TId - The entity ID type (defaults to string)
 */
export abstract class FindAllInteractor<
    TRequester extends Requester,
    TEntity extends ImmutableEntity<TId>,
    TUseCaseOutputData,
    TId = string,
> implements FindAllUseCase<TRequester, TUseCaseOutputData> {
    /**
     * Creates an instance of FindAllInteractor.
     *
     * @param {Repository<TRequester, TEntity, TId>} repository - The repository for retrieving entities
     */
    constructor(
        protected readonly repository: Repository<TRequester, TEntity, TId>,
    ) {}

    /**
     * Executes the find-all use case.
     * This is the template method that orchestrates the listing flow.
     *
     * @param {FindAllInput<TRequester>} parameters - The input parameters containing requester and query options
     * @returns {ResultAsync<PageResult<TUseCaseOutputData>>} The result containing the paginated entities mapped to output format
     */
    execute(
        parameters: FindAllInput<TRequester>,
    ): ResultAsync<PageResult<TUseCaseOutputData>> {
        //>
        //> > fr: Exécution du flux de listing en 3 étapes via le pattern template method.
        //> > en: Execute the listing flow in 3 steps via the template method pattern.
        //>
        return this.validateQueryParameters(parameters)
            .chainSuccess((validatedParams) =>
                this.repository.findAll({
                    requester: validatedParams.requester,
                    pageNumber: validatedParams.pageNumber,
                    pageSize: validatedParams.pageSize,
                    filter: validatedParams.filter,
                    sort: validatedParams.sort,
                    presets: validatedParams.presets,
                }),
            )
            .chainSuccess((pageResult) => this.mapToOutput(pageResult));
    }

    /**
     * Validates the query parameters before retrieval.
     * Override this method to add custom validation logic.
     *
     * @param {FindAllInput<TRequester>} parameters - The input parameters to validate
     * @returns {ResultAsync<FindAllInput<TRequester>>} The validation result containing the validated parameters
     */
    protected validateQueryParameters(
        parameters: FindAllInput<TRequester>,
    ): ResultAsync<FindAllInput<TRequester>> {
        //>
        //> > fr: Par défaut, aucune validation spécifique n'est appliquée.
        //> > en: By default, no specific validation is applied.
        //>
        return ResultAsync.liftSuccess(parameters);
    }

    /**
     * Maps the page result containing entities to the output format.
     * This method must be implemented by concrete interactors to define output mapping logic.
     *
     * @param {PageResult<TEntity>} pageResult - The page result containing entities
     * @returns {ResultAsync<PageResult<TUseCaseOutputData>>} The result containing the mapped page result
     */
    protected abstract mapToOutput(
        pageResult: PageResult<TEntity>,
    ): ResultAsync<PageResult<TUseCaseOutputData>>;
}
