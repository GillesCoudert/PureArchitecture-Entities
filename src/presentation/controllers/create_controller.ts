import type {
    Mapper,
    Requester,
    Translator,
    PureRequest,
} from '@gilles-coudert/pure-architecture';
import { PureController } from '@gilles-coudert/pure-architecture';
import type { Result } from '@gilles-coudert/pure-trace';
import { Success as SuccessResult } from '@gilles-coudert/pure-trace';
import type { CreateUseCase } from '../../application_boundary/use_cases/create/use_case';
import type { CreateInput } from '../../application_boundary/use_cases/create/input';

/**
 * Controller for handling create requests.
 * @template TRequester The requester/actor type for access control
 * @template TForm The type of the request body (form)
 * @template TInputData The input data type for the use case
 * @template TDto The data transfer object type (use case result)
 * @template TControllerResult The controller result type
 * @template TTranslator The translator type
 */
export abstract class CreateController<
    TControllerResult,
    TUseCaseInput extends CreateInput<TRequester, TInputData>,
    TUseCaseOutput,
    TForm,
    TTranslator extends Translator,
    TRequester extends Requester = TUseCaseInput extends CreateInput<
        infer R,
        unknown
    >
        ? R
        : never,
    TInputData = TUseCaseInput extends CreateInput<TRequester, infer D>
        ? D
        : never,
> extends PureController<
    TControllerResult,
    TUseCaseInput,
    TUseCaseOutput,
    TTranslator,
    TRequester
> {
    constructor(
        protected readonly interactor: CreateUseCase<
            TRequester,
            TInputData,
            TUseCaseOutput
        >,
        protected readonly translator: TTranslator,
        protected readonly mapper: Mapper<TForm, TInputData>,
    ) {
        super(interactor, translator);
    }

    protected getUseCaseInput(
        request: PureRequest<TRequester>,
    ): Result<TUseCaseInput> {
        const requester = request.getRequester();
        const form = this.extractFormData(request);
        const data = this.mapper.to(form);
        return new SuccessResult({
            requester,
            data,
        } as TUseCaseInput);
    }

    /**
     * Extract form data from the request.
     * Subclasses must implement this to extract the form data from their specific request type.
     * @param request The request object
     * @returns The form data
     */
    protected abstract extractFormData(request: PureRequest<TRequester>): TForm;
}
