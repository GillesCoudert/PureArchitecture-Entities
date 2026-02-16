import type { Requester, PureUseCase } from '@gilles-coudert/pure-architecture';
import type { DeleteInput } from './input';

/**
 * Use case interface for permanently deleting an entity.
 * Exposed to the presentation layer.
 *
 * @template TRequester - The requester/actor type for access control
 * @template TId - The entity ID type (defaults to string)
 */
export type DeleteUseCase<
    TRequester extends Requester,
    TId = string,
> = PureUseCase<DeleteInput<TRequester, TId>, void, TRequester>;
