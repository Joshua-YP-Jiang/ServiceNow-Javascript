//Get the department infomation of the caller at incident


// Script Include: Get_roles_of_assignee_scriptinclude
var Get_roles_of_assignee_scriptinclude = Class.create();
Get_roles_of_assignee_scriptinclude.prototype = Object.extendsObject(AbstractAjaxProcessor, {
   CallerDetails:function()
	{
		var answer2 = '';
		var caller = this.getParameter('sysparm_callerinfo'); 
		var grUser2 = new GlideRecord('sys_user');
		grUser2.addQuery('sys_id', caller);
		grUser2.query();
		while(grUser2.next())
		{
			var answer2 = grUser2.department.getDisplayValue();
		}
		return answer2;
	}
	
}); 


// Client Script: Get_roles_of_assignee // Incident table // onLoad
function onLoad() {
   var caller = g_form.getValue('caller_id');
   var gb = new GlideAjax('Get_roles_of_assignee_scriptinclude');
   gb.addParam('sysparm_name','CallerDetails');
   gb.addParam('sysparm_callerinfo',caller);
   gb.getXML(infocallback);

   function infocallback(response2)
   {
	var result2 = response2.responseXML.documentElement.getAttribute('answer')
	alert('the caller details are '+ result2);
	g_form.setValue('work_notes',result2);
	
   }


}
