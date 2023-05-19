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
      if(done){
        const data = new FormData();
        data.append('indexToCancel', index);
        axios.post('server.php', data).then(result => {
          this.tasks = result.data;
          this.printTask();
        })
      }else{
        this.errorMessage("Non hai completato la task!");
      }
    },

    errorMessage(errorMsg){
      this.message = errorMsg;
      setTimeout(() => {
        this.message = "";
      }, 5000);
    },

    newTask(){
      if(this.textNew.length > 5){
        const data = new FormData();
        data.append('newTaskText', this.textNew);
        axios.post('server.php', data).then(result => {
          this.textNew = "";
          this.tasks = result.data;
          // Richiamo la funzione di stampa
          this.printTask();
        })
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