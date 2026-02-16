import {
    type PureUseCase,
    type Requester,
} from '@gilles-coudert/pure-architecture';
import { type CreateInput } from './input';

/**
 * Use case interface for creating a new entity.
 * Exposed to the presentation layer without TEntity.
 *
 * @template TRequester - The requester/actor type for access control
 * @template TDto - The data transfer object type
 */
export type CreateUseCase<
    TRequester extends Requester,
    TInputData,
    TUseCaseOutput,
> = PureUseCase<
    CreateInput<TRequester, TInputData>,
    TUseCaseOutput,
    TRequester
>;
