import type { Requester } from '@gilles-coudert/pure-architecture';
import type { ResultAsync } from '@gilles-coudert/pure-trace';
import type { RestoreInput } from './input';

/**
 * Use case interface for restoring a soft deleted entity.
 * Exposed to the presentation layer.
 *
 * @template TRequester - The requester/actor type for access control
 * @template TId - The entity ID type (defaults to string)
 */
export interface RestoreUseCase<TRequester extends Requester, TId = string> {
    /**
     * Execute the use case: restore a soft deleted entity.
     * @param input - Command parameters containing requester and entity ID
     */
    execute(input: RestoreInput<TRequester, TId>): ResultAsync<void>;
}
