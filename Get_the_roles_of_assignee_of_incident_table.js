// Script Include: Get_roles_of_assignee_scriptinclude

var Get_roles_of_assignee_scriptinclude = Class.create();
Get_roles_of_assignee_scriptinclude.prototype = Object.extendsObject(AbstractAjaxProcessor, {
    

    INC_roles:function ()
	{
		var listroles = [];
		var assigneeclient = this.getParameter('sysparm_userRole');
		var grUser = new GlideRecord('sys_user_has_role');
		grUser.addQuery('user', assigneeclient);
		grUser.query();
		while(grUser.next())
		{
			listroles.push(grUser.role.getDisplayValue());
		}
		return listroles.join('\n');;
	}
	

});


// Client Script: Get_roles_of_assignee // Incident table // onLoad

function onLoad() {
   //Type appropriate comment here, and begin script below

   var assignee = g_form.getValue('assigned_to');
   var ga = new GlideAjax('Get_roles_of_assignee_scriptinclude');
   ga.addParam('sysparm_name','INC_roles');
   ga.addParam('sysparm_userRole',assignee);
   ga.getXML(rolescallback);
 
   function rolescallback(response)
   {
    var result = response.responseXML.documentElement.getAttribute('answer');
    alert('roles are:\n'+result);
   }
}

