export interface GraphicsWidgetPanelProps {
    selectedPosition: {
        x: number;
        y: number;
    } | null;
    selectedBounds: {
        x: number;
        y: number;
        width: number;
        height: number;
    } | null;
    selectedFillColor: string | null;
    selectedStrokeColor: string | null;
    selectedStrokeWidth: number | null;
    selectedContent: string | null;
    selectedFontSize: number | null;
    selectedItemType: string | null;
    selectedItemCount: number;
    onPropertyChange: (property: string, value: unknown) => void;
}
export declare function GraphicsWidgetPanel({ selectedPosition, selectedBounds, selectedFillColor, selectedStrokeColor, selectedStrokeWidth, selectedContent, selectedFontSize, selectedItemType, selectedItemCount, onPropertyChange, }: GraphicsWidgetPanelProps): import("react/jsx-runtime").JSX.Element;
export default GraphicsWidgetPanel;
