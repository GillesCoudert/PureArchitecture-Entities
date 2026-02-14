import type { Requester } from '@gilles-coudert/pure-architecture';
import type { ResultAsync } from '@gilles-coudert/pure-trace';
import type { SoftDeleteInput } from './input';

/**
 * Use case interface for soft deleting an entity.
 * Exposed to the presentation layer.
 *
 * @template TRequester - The requester/actor type for access control
 * @template TId - The entity ID type (defaults to string)
 */
export interface SoftDeleteUseCase<TRequester extends Requester, TId = string> {
    /**
     * Execute the use case: soft delete an entity by its ID (mark as deleted without removing).
     * @param input - Command parameters containing requester and entity ID
     */
    execute(input: SoftDeleteInput<TRequester, TId>): ResultAsync<void>;
}
