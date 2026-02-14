import type { Requester } from '@gilles-coudert/pure-architecture';
import type { ResultAsync } from '@gilles-coudert/pure-trace';
import type { UpdateInput } from './input';

/**
 * Use case interface for updating an existing entity.
 * Exposed to the presentation layer without TEntity.
 *
 * @template TRequester - The requester/actor type for access control
 * @template TDto - The data transfer object type
 * @template TId - The entity ID type (defaults to string)
 */
export interface UpdateUseCase<
    TRequester extends Requester,
    TInputData,
    TDto,
    TId = string,
> {
    /**
     * Execute the use case: update an existing entity and return it as a DTO.
     * @param input - Command parameters containing requester, entity ID, and updated data
     * @returns The updated entity as a DTO
     */
    execute(input: UpdateInput<TRequester, TInputData, TId>): ResultAsync<TDto>;
}
