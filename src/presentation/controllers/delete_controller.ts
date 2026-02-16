import type {
    Requester,
    Translator,
    PureRequest,
} from '@gilles-coudert/pure-architecture';
import { PureController } from '@gilles-coudert/pure-architecture';
import type { Result } from '@gilles-coudert/pure-trace';
import { generateFailure, Success } from '@gilles-coudert/pure-trace';
import type { DeleteUseCase } from '../../application_boundary/use_cases/delete/use_case';
import type { DeleteInput } from '../../application_boundary/use_cases/delete/input';

/**
 * Controller for handling delete requests.
 * @template TRequester The requester/actor type for access control
 * @template TId The entity ID type
 * @template TControllerResult The controller result type
 * @template TTranslator The translator type
 */
export abstract class DeleteController<
    TControllerResult,
    TUseCaseInput extends DeleteInput<TRequester, TId>,
    TId,
    TTranslator extends Translator,
    TRequester extends Requester = TUseCaseInput extends DeleteInput<
        infer R,
        unknown
    >
        ? R
        : never,
> extends PureController<
    TControllerResult,
    TUseCaseInput,
    void,
    TTranslator,
    TRequester
> {
    constructor(
        protected readonly interactor: DeleteUseCase<TRequester, TId>,
        protected readonly translator: TTranslator,
    ) {
        super(interactor, translator);
    }

    protected getUseCaseInput(
        request: PureRequest<TRequester>,
    ): Result<TUseCaseInput> {
        const requester = request.getRequester();
        const id = this.extractId(request);
        if (id === undefined) {
            return generateFailure({
                type: 'processError',
                code: 'idNotProvided',
            });
        }
        return new Success({
            requester,
            id,
        } as TUseCaseInput);
    }

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
