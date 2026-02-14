import type { Requester } from '@gilles-coudert/pure-architecture';
import type { ResultAsync } from '@gilles-coudert/pure-trace';
import type { DeleteInput } from './input';

/**
 * Use case interface for permanently deleting an entity.
 * Exposed to the presentation layer.
 *
 * @template TRequester - The requester/actor type for access control
 * @template TId - The entity ID type (defaults to string)
 */
export interface DeleteUseCase<TRequester extends Requester, TId = string> {
    /**
     * Execute the use case: permanently delete an entity by its ID.
     * @param input - Command parameters containing requester and entity ID
     */
    execute(input: DeleteInput<TRequester, TId>): ResultAsync<void>;
}
