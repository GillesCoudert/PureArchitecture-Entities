import type {
    PageResult,
    PureUseCase,
    Requester,
} from '@gilles-coudert/pure-architecture';
import type { ResultAsync } from '@gilles-coudert/pure-trace';
import type { FindAllInput } from './input';

/**
 * Use case interface for finding all entities.
 * Exposed to the presentation layer without TEntity.
 *
 * @template TRequester - The requester/actor type for access control
 * @template TDto - The data transfer object type
 */
export interface FindAllUseCase<
    TRequester extends Requester,
    TDto,
> extends PureUseCase<TRequester, PageResult<TDto>> {
    /**
     * Execute the use case: find all entities and return them as DTOs.
     * @param input - Query parameters containing requester
     * @returns Array of entities as DTOs
     */
    execute(input: FindAllInput<TRequester>): ResultAsync<PageResult<TDto>>;
}
