import * as Css from "./css";
import * as PageFloats from "./page-floats";
import * as Task from "./task";
import * as Vtree from "./vtree";
import { Layout } from "./types";
declare const PageFloatFragment: typeof PageFloats.PageFloatFragment;
export declare class Footnote extends PageFloats.PageFloat {
    readonly footnotePolicy: Css.Ident | null;
    constructor(nodePosition: Vtree.NodePosition, floatReference: PageFloats.FloatReference, flowName: string, footnotePolicy: Css.Ident | null, floatMinWrapBlock: Css.Numeric | null);
    isAllowedToPrecede(other: PageFloats.PageFloat): boolean;
}
/**
 * @extends PageFloatFragment
 */
export declare class FootnoteFragment extends PageFloatFragment {
    constructor(floatReference: PageFloats.FloatReference, continuations: PageFloats.PageFloatContinuation[], area: Vtree.Container, continues: boolean);
    getOrder(): number;
    shouldBeStashedBefore(float: PageFloats.PageFloat): boolean;
}
export declare class LineFootnotePolicyLayoutConstraint implements Layout.LayoutConstraint {
    readonly footnote: Footnote;
    constructor(footnote: Footnote);
    allowLayout(nodeContext: Vtree.NodeContext): boolean;
}
export declare class FootnoteLayoutStrategy implements PageFloats.PageFloatLayoutStrategy {
    /** @override */
    appliesToNodeContext(nodeContext: Vtree.NodeContext): boolean;
    /** @override */
    appliesToFloat(float: PageFloats.PageFloat): boolean;
    /** @override */
    createPageFloat(nodeContext: Vtree.NodeContext, pageFloatLayoutContext: PageFloats.PageFloatLayoutContext, column: Layout.Column): Task.Result<PageFloats.PageFloat>;
    /** @override */
    createPageFloatFragment(continuations: PageFloats.PageFloatContinuation[], floatSide: string, floatArea: Layout.PageFloatArea, continues: boolean): PageFloats.PageFloatFragment;
    /** @override */
    findPageFloatFragment(float: PageFloats.PageFloat, pageFloatLayoutContext: PageFloats.PageFloatLayoutContext): PageFloats.PageFloatFragment | null;
    /** @override */
    adjustPageFloatArea(floatArea: Layout.PageFloatArea, floatContainer: Vtree.Container, column: Layout.Column): void;
    /** @override */
    forbid(float: PageFloats.PageFloat, pageFloatLayoutContext: PageFloats.PageFloatLayoutContext): void;
}
export {};
