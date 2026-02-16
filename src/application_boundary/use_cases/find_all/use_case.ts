import type {
    PageResult,
    PureUseCase,
    Requester,
} from '@gilles-coudert/pure-architecture';
import type { FindAllInput } from './input';

/**
 * Use case interface for finding all entities.
 * Exposed to the presentation layer without TEntity.
 *
 * @template TRequester - The requester/actor type for access control
 * @template TUseCaseOutputData - The data type for the use case output
 */
export type FindAllUseCase<
    TRequester extends Requester,
    TUseCaseOutputData,
> = PureUseCase<
    FindAllInput<TRequester>,
    PageResult<TUseCaseOutputData>,
    TRequester
>;
