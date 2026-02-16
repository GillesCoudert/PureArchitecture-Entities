import type { Requester, PureUseCase } from '@gilles-coudert/pure-architecture';
import type { UpdateInput } from './input';

/**
 * Use case interface for updating an existing entity.
 * Exposed to the presentation layer without TEntity.
 *
 * @template TRequester - The requester/actor type for access control
 * @template TDto - The data transfer object type
 * @template TId - The entity ID type (defaults to string)
 */
export type UpdateUseCase<
    TRequester extends Requester,
    TInputData,
    TUseCaseOutput,
    TId = string,
> = PureUseCase<
    UpdateInput<TRequester, TInputData, TId>,
    TUseCaseOutput,
    TRequester
>;
