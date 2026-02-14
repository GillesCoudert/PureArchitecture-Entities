import type {
    Mapper,
    Requester,
    Translator,
    PureRequest,
} from '@gilles-coudert/pure-architecture';
import { PureController } from '@gilles-coudert/pure-architecture';
import type { Result } from '@gilles-coudert/pure-trace';
import { generateFailure, Success } from '@gilles-coudert/pure-trace';
import type { UpdateUseCase } from '../../application_boundary/use_cases/update/use_case';
import type { UpdateInput } from '../../application_boundary/use_cases/update/input';

/**
 * Controller for handling update requests.
 * @template TRequester The requester/actor type for access control
 * @template TForm The type of the request body (form)
 * @template TInputData The type of the input data for the use case
 * @template TDto The data transfer object type (use case result)
 * @template TId The entity ID type
 * @template TControllerResult The controller result type
 * @template TTranslator The translator type
 */
export abstract class UpdateController<
    TRequester extends Requester,
    TForm,
    TInputData,
    TDto,
    TId,
    TControllerResult,
    TTranslator extends Translator,
> extends PureController<
    TControllerResult,
    UpdateUseCase<TRequester, TInputData, TDto, TId>,
    TRequester,
    TDto,
    TTranslator
> {
    constructor(
        protected readonly interactor: UpdateUseCase<
            TRequester,
            TInputData,
            TDto,
            TId
        >,
        protected readonly translator: TTranslator,
        protected readonly mapper: Mapper<TForm, TInputData>,
    ) {
        super(interactor, translator);
    }

    protected getUseCaseInput(
        request: PureRequest<TRequester>,
    ): Result<UpdateInput<TRequester, TInputData, TId>> {
        const requester = request.getRequester();
        const form = this.extractFormData(request);
        const id = this.extractId(request);
        if (id === undefined) {
            return generateFailure({
                type: 'processError',
                code: 'idNotProvided',
            });
        }
        const data = this.mapper.to(form);
        return new Success({
            requester,
            id,
            data,
        });
    }

    /**
     * Extract form data from the request.
     * Subclasses must implement this to extract the form data from their specific request type.
     * @param request The request object
     * @returns The form data
     */
    protected abstract extractFormData(request: PureRequest<TRequester>): TForm;

    /**
     * Extract the entity ID from the request.
     * Subclasses must implement this to extract the ID from their specific request type.
     * @param request The request object
     * @returns The entity ID or undefined
     */
    protected abstract extractId(
        request: PureRequest<TRequester>,
    ): TId | undefined;
}
