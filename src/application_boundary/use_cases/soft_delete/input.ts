import type {
    PureParameters,
    Requester,
} from '@gilles-coudert/pure-architecture';

/**
 * Input parameters for soft deleting an entity.
 * Exposed to the presentation layer with configurable TId.
 *
 * @template TRequester - The requester/actor type for access control
 * @template TId - The entity ID type (defaults to string)
 */
export interface SoftDeleteInput<
    TRequester extends Requester,
    TId = string,
> extends PureParameters<TRequester> {
    /**
     * The entity ID to soft delete
     */
    id: TId;
}
