import type { Requester, PureUseCase } from '@gilles-coudert/pure-architecture';
import type { SoftDeleteInput } from './input';

/**
 * Use case interface for soft deleting an entity.
 * Exposed to the presentation layer.
 *
 * @template TRequester - The requester/actor type for access control
 * @template TId - The entity ID type (defaults to string)
 */
export type SoftDeleteUseCase<
    TRequester extends Requester,
    TId = string,
> = PureUseCase<SoftDeleteInput<TRequester, TId>, void, TRequester>;
