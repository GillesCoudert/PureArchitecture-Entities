import type { Requester, PureUseCase } from '@gilles-coudert/pure-architecture';
import type { RestoreInput } from './input';

/**
 * Use case interface for restoring a soft deleted entity.
 * Exposed to the presentation layer.
 *
 * @template TRequester - The requester/actor type for access control
 * @template TId - The entity ID type (defaults to string)
 */
export type RestoreUseCase<
    TRequester extends Requester,
    TId = string,
> = PureUseCase<RestoreInput<TRequester, TId>, void, TRequester>;
