const {createApp} = Vue;

createApp({
  data(){
    return{
      tasks: [],
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
    },
    
    // Se nel database ho delle task, al mounted della pagina verranno prese tramite una chiamata api.get da server.php e salvate in this.tasks, poi verranno stampate nell'index tramite il v-for di vue
    printTask(){
      axios.get('server.php').then(result =>{
        console.log(result);
        this.tasks = result.data;
      })
    }
  },
  mounted(){
    this.printTask()
  }
}).mount("#app")