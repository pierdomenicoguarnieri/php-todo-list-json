const {createApp} = Vue;

createApp({
  data(){
    return{
      tasks: [
        {
          text: "Lavare gli scogli",
          done: true
        },
        {
          text: "Asciugare gli scogli",
          done: false
        },
        {
          text: "Fare una focaccia",
          done: false
        },
      ],
      message: "",
      textNew: ""
    }
  },

  methods: {
    deleteTask(index, done){
      done ? this.tasks.splice(index, 1) : this.errorMessage("Non hai completato la task!")
    },

    errorMessage(errorMsg){
      this.message = errorMsg;
      setTimeout(() => {
        this.message = "";
      }, 5000);
    },

    newTask(textNew){
      const newTask = {
        text: textNew,
        done: false
      }
      if(textNew.length > 5){
        this.tasks.unshift(newTask);
        this.textNew = "";
      }else{
        this.errorMessage("Il nome della task deve essere di almeno 5 caratteri!");
      }
    }
  }
}).mount("#app")