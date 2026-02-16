import type { PureUseCase, Requester } from '@gilles-coudert/pure-architecture';
import type { FindByIdInput } from './input';

/**
 * Use case interface for finding an entity by its ID.
 * Exposed to the presentation layer without TEntity.
 *
 * @template TRequester - The requester/actor type for access control
 * @template TDto - The data transfer object type
 * @template TId - The entity ID type (defaults to string)
 */
export type FindByIdUseCase<
    TRequester extends Requester,
    TUseCaseOutput,
    TId = string,
> = PureUseCase<FindByIdInput<TRequester, TId>, TUseCaseOutput, TRequester>;
