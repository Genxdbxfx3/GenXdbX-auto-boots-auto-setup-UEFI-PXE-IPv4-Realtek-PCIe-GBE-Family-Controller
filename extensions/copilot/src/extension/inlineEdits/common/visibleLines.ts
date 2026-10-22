/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

export interface ILineSpan {
	readonly startLine: number;
	readonly endLine: number;
}

/**
 * Whether every line of `span` (inclusive) lies inside a single visible range.
 */
export function isSpanFullyVisible(visibleRanges: readonly ILineSpan[], span: ILineSpan): boolean {
	return visibleRanges.some(r => r.startLine <= span.startLine && span.endLine <= r.endLine);
}

/**
 * Lines an edit occupies on screen: the replaced lines, extended by the lines of the new text.
 */
export function getEditedLineSpan(replaceStartLine: number, replaceEndLine: number, newText: string): ILineSpan {
	const newTextEndLine = replaceStartLine + newText.split('\n').length - 1;
	return { startLine: replaceStartLine, endLine: Math.max(replaceEndLine, newTextEndLine) };
}
