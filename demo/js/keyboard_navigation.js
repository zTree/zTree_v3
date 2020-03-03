/*
 * JQuery zTree keyboard navigation extension
 * zTree v3.5.42 or later
 * http://www.xbrlquery.com/
 *
 * Copyright (c) 2019 Bill Seddon
 *
 * Licensed same as jquery - MIT License
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Date: 2020-02-18
 */

( function ($) 
{
	/**
	 * Dummy function to provide a placeholder for the destroy function
	 */
	$.fn.zTreeKeyboardNavigationDestroy = function()
	{
	}

	/**
	 * Creates a function that adds keyboard navigation:
	 * Home: home key (keycode 36)				Goes to the first root element is visible
	 * End: end key (keycode 35)				Goes to the last leaf node and will expand nodes and scroll the element into view
	 * Down: right cursor key (keycode 39)		Goes to the next visible node in the tree following the hierarchy
	 * Next: down cursor key (keycode 40)		Goes to the next visible node at the same level
	 * Up: up cursor key (keycode 37)			Goes to the prior visible node at the same level
	 * Previous: left cursor key (keycode 38)	Goes to the prior visible node following the hierarchy
	 * Toggle: space key (keycode 32)			Toggles the expand/collapse state of a parent node
	 * @param {IxTreeObj} zTree
	 * @param {string|JQuery<HTMLElement} element
	 * @param {IJSON[]} selectedNodes
	 */
	$.fn.zTreeKeyboardNavigation = function(zTree, element, selectedNodes = null )
		{
			if (typeof element === 'string' || element instanceof String)
			{
				element = $(element);
			}

			var rootNodes = zTree.getNodes();
			if ( ! rootNodes ) return;

			var focusSelectedNode = function()
			{
				if( ( selectedNodes = zTree.getSelectedNodes() ) && selectedNodes.length )
				{
					$("#" + selectedNodes[0].tId ).focus();
				}
			}

			// Clear the previous event handler (there may be none)
			$.fn.zTreeKeyboardNavigationDestroy();

			/**
			 * Make it possible to destroy (remove the event handlers)
			 */
			$.fn.zTreeKeyboardNavigationDestroy = function()
			{
				$(element).off( 'keydown' );
			}

			$(element).on( 'keydown', function( e )
				{
					var selectedNodes = zTree.getSelectedNodes();
					var selectedNode = selectedNodes.length ? selectedNodes[0] : null;

					var processSpace = function()
					{
						// If there are no nodes or the selected node is not a parent, get out
						if ( selectedNode && selectedNode.isParent )
						{
							// Toggle the node
							zTree.expandNode( selectedNode, null, null, null, false );
						}
					}
					
					var processHome = function()
					{
						zTree.selectNode( rootNodes[0], false, true );
					}

					var processEnd = function()
					{
						var nodes = zTree.transformToArray(rootNodes);
						// Select the last node
						zTree.selectNode( nodes[ nodes.length - 1 ] );
					}
					
					var processUp = function()
					{
						var priorNode;
						if ( selectedNode )
						{
							priorNode = selectedNode.getPreNode();
							if ( ! priorNode ) return;
						}
						else
						{
							processEnd();
						}

						if ( ! priorNode ) return;

						zTree.selectNode( priorNode );
					}

					var processDown = function()
					{
						var nextNode;
						if ( selectedNode )
						{
							nextNode = selectedNode.getNextNode();
							if ( ! nextNode ) return;
						}
						else
						{
							processHome();
						}

						if ( ! nextNode ) return;

						zTree.selectNode( nextNode );
					}

					var processOut = function()
					{
						if ( ! selectedNode ) return;

						var parentNode = selectedNode.getParentNode();
						var priorNode = selectedNode.getPreNode();
						if ( ! parentNode && ! priorNode ) return; // Must have been the root node

						if ( priorNode )
						{
							if ( priorNode.isParent )
							{
								// There is a prior node, now the the question is where is the last open node?
								while ( priorNode )
								{
									if ( ! priorNode.isParent || ! priorNode.open || ! priorNode.children ) break;

									priorNode = priorNode.children[ priorNode.children.length -1 ];
								}

								zTree.selectNode( priorNode );
								return;
							}
							else
							{
								zTree.selectNode( priorNode );
								return;
							}
						}

						// Find the parent node with a valid prior sibling
						if ( parentNode )
						{
							// This call should be silent otherwise (in my view a bug in) 
							// selectNode causes the root node to blur
							zTree.selectNode( parentNode, false, true );
						}						
					}

					var processIn = function()
					{
						if ( ! selectedNode ) return;

						if ( selectedNode.isParent && selectedNode.open && selectedNode.children )
						{
							zTree.selectNode( selectedNode.children[0] );
							return;
						}

						var nextNode = selectedNode.getNextNode();
						if ( nextNode )
						{
							zTree.selectNode( nextNode );
						}
						else
						{
							// Cannot be root if there is a selected node that is not a parent
							var node = selectedNode;
							// Find the parent node with a valid next sibling
							while( node = node.getParentNode() )
							{
								var nextNode = node.getNextNode();
								if ( nextNode )
								{
									zTree.selectNode( nextNode );
									break;
								}
							}
						}
					}

					var processLetter = function( keyCode )
					{
						if ( ! Array.from( {length: 26}, (v, i) => i + 65 ).includes( keyCode & 95 ) ) return false;

						var nodes = zTree.transformToArray(rootNodes);
						nodes = nodes.filter( node => 
						{
							return 'accesskey' in node &&  node.accesskey.length && ( node.accesskey.charCodeAt(0) & 95 ) == keyCode;
						} );
						
						if ( ! nodes.length ) return false;
						
						var selectedNodes = zTree.getSelectedNodes();
						if ( ! selectedNodes.length ) return false;

						if ( selectedNodes[0] == nodes[0] ) return false;

						zTree.selectNode( nodes[0] );

						return true;
					}

					// console.log('before');
					// console.log(document.activeElement);

					switch ( e.keyCode )
					{
						case 32: /* Toggle parent nodes */
							processSpace();
							return;

						case 36: /* Home - go to the root node */
							processHome();
							break;

						case 35: /* End - go to the last node */ 
							processEnd();
							break;

						case 33: /* PageUp */
							// Do nothing
							break;

						case 34: /* PageDown */ 
							// Do nothing
							break;

						case 37: /* Left */
							processOut();
							break;

						case 38: /* Up */
							processUp();
							break;

						case 39: /* Right */
							processIn();
							break;

						case 40: /* Down */ 
							processDown();
							break;

						default:
							if ( ! processLetter( e.keyCode & 95 ) ) return;
							break;
					}

					// console.log('after');
					// console.log(document.activeElement);
					focusSelectedNode();
				} );

			if ( selectedNodes && selectedNodes.length )
			{
				zTree.selectNode( selectedNodes[0] );
				focusSelectedNode();
			}
			else
			{
			$(element).trigger({ type : 'keydown', which : 36, keyCode: 36 });
			}

		}

} )(jQuery);