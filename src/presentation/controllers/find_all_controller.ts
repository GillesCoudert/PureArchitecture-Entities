import type {
    PageResult,
    Requester,
    Translator,
    PureRequest,
} from '@gilles-coudert/pure-architecture';
import { PureController } from '@gilles-coudert/pure-architecture';
import type { Result } from '@gilles-coudert/pure-trace';
import { Success } from '@gilles-coudert/pure-trace';
import type { FindAllUseCase } from '../../application_boundary/use_cases/find_all/use_case';
import type { FindAllInput } from '../../application_boundary/use_cases/find_all/input';

/**
 * Pagination parameters for find all requests.
 */
export interface PaginationParams {
    pageNumber?: number;
    pageSize?: number;
    filter?: string;
    sort?: string;
    presets?: string;
}

/**
 * Controller for handling find all requests.
 * @template TRequester The requester/actor type for access control
 * @template TDto The data transfer object type
 * @template TControllerResult The controller result type
 * @template TTranslator The translator type
 */
export abstract class FindAllController<
    TRequester extends Requester,
    TDto,
    TControllerResult,
    TTranslator extends Translator,
> extends PureController<
    TControllerResult,
    FindAllUseCase<TRequester, TDto>,
    TRequester,
    PageResult<TDto>,
    TTranslator
> {
    constructor(
        protected readonly interactor: FindAllUseCase<TRequester, TDto>,
        protected readonly translator: TTranslator,
    ) {
        super(interactor, translator);
    }

    protected getUseCaseInput(
        request: PureRequest<TRequester>,
    ): Result<FindAllInput<TRequester>> {
        const requester = request.getRequester();
        const params = this.extractPaginationParams(request);
        return new Success({
            requester,
            pageNumber: params.pageNumber,
            pageSize: params.pageSize,
            filter: params.filter,
            sort: params.sort,
            presets: params.presets,
        });
    }

    /**
     * Extract pagination parameters from the request.
     * Subclasses must implement this to extract pagination params from their specific request type.
     * @param request The request object
     * @returns The pagination parameters
     */
    protected abstract extractPaginationParams(
        request: PureRequest<TRequester>,
    ): PaginationParams;
}
