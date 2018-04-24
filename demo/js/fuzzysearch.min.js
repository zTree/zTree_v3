/*
 * email: bigablecat@hotmail.com
 * Date: 2018-04-14
 */

/**
 * @param zTreeId the ztree id used to get the ztree object
 * @param searchField selector of your input for fuzzy search
 * @param isHighLight whether highlight the match words, default true
 * @param isExpand whether to expand the node, default false
 * @returns
 */
function fuzzySearch(l,h,e,f){function m(b,c,k){c||(c="");k=b.getNodesByFilter(function(a){a&&a.oldname&&0<a.oldname.length&&(a[d]=a.oldname);b.updateNode(a);if(0==c.length)return b.showNode(a),b.expandNode(a,f),!0;if(a[d]&&-1!=a[d].toLowerCase().indexOf(c.toLowerCase())){if(e){var p=c.replace(n,function(a){return"\\"+a});a.oldname=a[d];a[d]=a.oldname.replace(new RegExp(p,"gi"),function(a){return'\x3cspan style\x3d"color: whitesmoke;background-color: darkred;"\x3e'+a+"\x3c/span\x3e"});b.updateNode(a)}b.showNode(a);return!0}b.hideNode(a);return!1});q(k,c)}function q(b,d){if(b&&0<b.length)if(0<d.length)$.each(b,function(a,b){var d=b.getPath();if(d&&0<d.length)for(var e=0;e<d.length-1;e++)c.showNode(d[e]),c.expandNode(d[e],!0)});else{var e=c.getNodesByParam("level","0");$.each(e,function(a,b){c.expandNode(b,!0)})}}function r(b){g&&clearTimeout(g);g=setTimeout(function(){m(c,b);$(h).focus()},500)}var c=$.fn.zTree.getZTreeObj(l);c||alter("fail to get ztree object");var d=c.setting.data.key.name;e=!1===e?!1:!0;f=f?!0:!1;c.setting.view.nameIsHTML=e;var n=RegExp("[\\[\\]\\\\^\\$\\.\\|\\?\\*\\+\\(\\)]","gi");$(h).bind("input propertychange",function(){var b=$(this).val();r(b)});var g=null};