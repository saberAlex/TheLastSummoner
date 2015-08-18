//creating name and button widget!!!
//JOB LIST TEMPLATE:
//TODOLIST... get the element username (after login) added rate... 

require([
	"dojo/_base/declare",
	"dojo/_base/fx",
	"dojo/dom",
	"dojo/dom-construct",
	"dojo/_base/lang",
	"dojo/dom-style",
	"dojo/mouse",
	"dojo/on",
	"dijit/_WidgetBase",
	"dijit/_TemplatedMixin",
	"dojo/request",
	"dojo/json",
	"dojo/text!./templates/job.panel.html",
	"dojo/domReady!"
	], function( declare, baseFx, dom, domConstruct, lang, domStyle, mouse, on, _WidgetBase, _TemplatedMixin, request, JSON, template){
		 var userdummy = "1";
		 var jobName = "";
		 var jobList;
		 var jobWidgets = [];
		 request.get("/jobs/").then(
		 	function(response){
		 		jobList =   JSON.parse(response, true);;
		 		console.log(jobList);
		 		//create the list element:
		 		var jobNameContainer = dom.byId("listJob");
		 		for(var i = 0; i < jobList.length; i++){
		 			domConstruct.create("button", {
		 				innerHTML: jobList[i].name,
		 				class:"list-group-item btn-info",
		 				style: {
		 					fontWeight: "bold",
		 					color: "firebrick"
		 				}
		 			}, jobNameContainer);

		 			jobWidgets.push(new JobPanelWidget(jobList[i])); 
		 			//ID name: JobPanelWidget_0

		 			on(dom.byId("listJob").getElementsByTagName("button")[i], "click", function(job, jobWidget) {
		 				domConstruct.empty("JobWidgetContainer");
		 				jobWidget.placeAt(dom.byId("JobWidgetContainer"));
		 				jobName = job.name;
		 			}.bind(this, jobList[i], jobWidgets[i]));

		 		}

		 		on(dom.byId("newCommentButton"), "click", function() {
		 			console.log(dom.byId("JobWidgetContainer").getElementsByTagName("ul"));
		 			var ul = dom.byId("ulComment");//.getElementsByTagName("ul");
		 			var info = dom.byId("newComment").value;
		 			var createddate = new Date();
		 			//added new comment:
		 			var newComment = {
		 				username: "dummy",
		 				info: info,
		 				createddate: createddate
		 			}

		 				var spanElement = "<span class='commentDate'>" + newComment.createddate.toUTCString()+ "</span>";
		 				var info = "<p>" + newComment.info + "</p>"
		 				var inner = "<p>" + newComment.username + spanElement + "</p>" + info;
			 			domConstruct.create("li", {
			 				innerHTML: inner
			 			}, ul);

			 			dom.byId("newComment").value = "";

			 			request.post("/jobs/" + jobName, {
				 			data: {
					 			username: userdummy,
					 			info: info,
					 			userpic: "img/noimage.jpg",
					 			createddate: createddate
				 			}
				 			}).then(function(text){
				 					console.log("The server returned: ", text);
				 		});

				 			});

		 	},
		 	function(error){
		 		console.log(error);
		 	}
		 );



		 declare("JobPanelWidget", [_WidgetBase, _TemplatedMixin], {
		 		templateString: template,
		 		name: "no name",
		 		info: "no info",
		 		comments: [
		 			{
		 				username: "dummy Name",
		 				info: "dummy Info",
		 				createddate: new Date(),
		 			}
		 		],

		 		postCreate: function() {
		 			var domNode = this.domNode;
		 			this.inherited(arguments); //What is this exactly???
		 			var commentNode = this.commentNode;
		 			console.log("comment: " + this.comments);
		 			var comments = this.comments;
		 			for(var i = 0; i < comments.length; i++) {
		 				var spanElement = "<span class='commentDate'>" + comments[i].createddate+ "</span>";
		 				var info = "<p>" + comments[i].info + "</p>"
		 				var inner = "<p>" + comments[i].username + spanElement + "</p>" + info;
			 			domConstruct.create("li", {
			 				innerHTML: inner
			 			}, commentNode);
		 		}
		 		}
		 });



	});
