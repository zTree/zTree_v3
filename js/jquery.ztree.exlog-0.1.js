//ext log status
//requrie jquery.cookie.js
;(function($)
{
	var ztreeStatusCookieKey ='ztree-log-status';
	$.fn.zTree && (
	//log status
	$.fn.zTree.logStatus = function(event, treeId, treeNode)
	{
		var _nodes = ($.cookie(ztreeStatusCookieKey) && $.cookie(ztreeStatusCookieKey).split(',') )|| [];
		var _index = $.inArray(treeNode.id + '', _nodes);

		if(treeNode.open && _index === -1)
		{
			_nodes.push(treeNode.id);
		}	
		else
		{
			_nodes.splice(_index, 1);
		}

		$.cookie(ztreeStatusCookieKey, _nodes.join(','));
	},
	//loadding status for simple data
	$.fn.zTree.loaddingStatus = function(nodes)
	{
		var _nodes = ($.cookie(ztreeStatusCookieKey) && $.cookie(ztreeStatusCookieKey).split(',') )|| [];
		if(!_nodes || _nodes.length === 0)
		{
			return nodes;
		}
		for(var i in nodes)
		{
			var _node = nodes[i];
			if($.inArray(_node.id + '',  _nodes) === -1)
			{
				_node.open = false;
			}
			else
			{
				_node.open = true;
			}
		}
		return nodes;
	},
	//get top parent node
	$.fn.zTree.getTopParentNode = function(node)
	{
		while(node && node.getParentNode() != null)
		{
			node = node.getParentNode();
		}
		return node;
	},
	//expand level
	$.fn.zTree.expandLevel = function(level)
	{
		if(level === undefined || typeof level !== 'number')
		{
			return;
		}
		for (var i = 0; i < level ; i++) 
		{
			(function(i)
			{
				setTimeout(function()
				{
					$('.ztree .level' + i).click();
				}, i*100);
			})(i)
		};
	}
	);

})(jQuery);
