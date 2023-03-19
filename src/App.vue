<!-- <script setup>
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
</script> -->

<template>
  <div id="app">
    <header>
      <h3 >{{ AppSetting.Title }}</h3>
      <div style="clear:both"></div> 
      
        <!-- checkout functionality -->
      <button class="btn btn-default " @click="showCheckout">
        <!-- {{ totalItemsInTheCart }} -->
        <font-awesome-icon icon="fas fa-shopping-cart"></font-awesome-icon>
        Checkout {{ totalItemsInTheCart }}
      </button>
      

    
      
      <button v-if="testConsole" @click="toggleShowTestConsole">
        <font-awesome-icon icon="fa-solid fa-text-height"></font-awesome-icon>
        Show/Hide Test Console
      </button>
      <div style="clear:both"></div> 
      <div v-if="testConsole && ShowTestConsole" class="pwa-area " style="border:2px solid black; padding:2px;">
        <button @click="saveLessonToDB">
          <font-awesome-icon icon="fa-solid fa-save"></font-awesome-icon>
          Test Insert Data Lesson
        </button>
        <button @click="DeleteAllCaches">
          <font-awesome-icon icon="fa-solid fa-trash"></font-awesome-icon>
          Delete All Caches
        </button>
        <button @click="reloadPage">
          <font-awesome-icon icon="fa-solid fa-sync"></font-awesome-icon>
          Reload This Page
        </button>

        <span class="test-elem" style="font-size: 20px;font-weight: 700;">HTTPS TEST: <a v-bind:href="serverURL"
            target="_blank">Link</a> </span>
        <button @click="unregisterAllServiceWorkers">

          <font-awesome-icon icon="fab fa-uniregistry"></font-awesome-icon>
          Unregister all ServiceWorkers
        </button>


      </div>


    </header>

  <main>
    <component :is="currentView" :lessons="lessons" :searchResults="searchResults" :imagesBaseURL="imagesBaseURL"
      :MyCart="MyCart" @add-to-cart="AddToCart" 
      :checkoutOrder="checkoutOrder" :users="users"
      :submitCheckoutForm="submitCheckoutForm"></component>
    </main>
    <!-- 
                        <main>
                          <TheWelcome />
                        </main> -->
  </div>
</template>



<script>
import ProductList from './components/ProductList.vue'
import Checkout from './components/Checkout.vue'
import lessons from './assets/json/lessons.json'

export default {
  name: 'hello',
  data() {
    return {
      // sitename: 'Welcome to our site',
      AppSetting: {
        Title: "After School Classes App",
      },
      testConsole: true,
      ShowTestConsole: false,
      lessons: [],
      // lessons: lessons,
      searchResults: [],
      // serverURL:"http://localhost:3000/collections/lessons",
      serverURL: "https://cst3145coursework2-env.eba-vqei52mg.us-east-1.elasticbeanstalk.com/collections/lessons",
      MyCart: {
        count: 0,
        lessons: [],
      },
      showLessons: true,
      SearchResultLesson: null,
      imagesBaseURL: "",
      // imagesBaseURL: "https://cst3145coursework2-env.eba-vqei52mg.us-east-1.elasticbeanstalk.com/",
      checkoutOrder: {
        name: "",
        phone: 0,
        lesson_id: 0,
        spaces: 0
      },
      users: {
        name: "",
        password: "",
        email: "",
      },
      // For Search Input `
      SearchItemsView: false,
      sorted: '',
      currentView: ProductList
    }
  },
  components: { ProductList, Checkout },
  created: function () {
    // Service Worker CW3
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("service-worker.js");
      }
    // fetch(this.serverURL).then(
    //     function(response) {
    //         response.text().then(
    //             function(text) {
    //             // MyStore.lessons = json;
    //             alert(text);
    //             }
    //         )
    //     }
    // );
    let MyStore = this;
    fetch(this.serverURL).then(
      function (response) {
        response.json().then(
          function (json) {
            // note that we used ‘webstore.lessons’
            // instead of 'this.lessons’
            // alert(json);
            MyStore.lessons = json;
            // console.log(lessons);
          }
        )
      }
    );
  },
  methods: {
    // Search Keyup Function
    SearchActivated: function () {
      // Searching results visible true
      this.SearchItemsView = true;

      if (this.SearchResultLesson == "") {
        this.SearchItemsView = false;
      }

      // 
      fetch("https://cst3145coursework2-env.eba-vqei52mg.us-east-1.elasticbeanstalk.com/collections/lessons/search/" + this.SearchResultLesson).then(
        function (response) {
          response.json().then(
            function (json) {
              this.searchResults = json;
              // console.log(searchResults);
            }
          )
        }
      );
    },
    sortedProducts(sorted) {
      // Sorting Lessons by Spaces Left
      if (this.sorted === "b") {
        function compare(a, b) {

          if (a.spaces < b.spaces) return 1;
          if (a.spaces > b.spaces) return -1;
          return 0;
        }

        console.log(this.sorted);
        return this.lessons.sort(compare);
      } else {
        // Sorting Lessons by Price
        function compare(a, b) {
          if (a.price > b.price) return 1;
          if (a.price < b.price) return -1;
          return 0;
        }

        console.log(this.sorted);
        return this.lessons.sort(compare);
      }
    },
    toggleShowTestConsole() {
      this.ShowTestConsole = !this.ShowTestConsole;
    },
    reloadPage() {
      window.location.reload();
    },
    unregisterAllServiceWorkers() {
      navigator.serviceWorker.getRegistrations().then(function (registrations) {
        for (let registration of registrations) {
          registration.unregister()
        }
      });
      console.log("ServiceWorkers Unregistered");
    },
    DeleteAllCaches() {
      caches.keys().then(function (names) {
        for (let name of names)
          caches.delete(name);
      });
      console.log("All Caches Deleted");
    },
    showCheckout() {
      // this.showLessons = this.showLessons ? false : true;
      if (this.currentView === ProductList) {
        this.currentView = Checkout;
      } else {
        this.currentView = ProductList;
      }
    },
    saveLessonToDB() {
      const newLesson = {
        "id": 1,
        "subjectImg": "images/book-english.png",
        "subjectName": "English (New)",
        "location": "London",
        "price": 40,
        "spaces": 25,
        "currency": "£"
      }

      fetch(this.serverURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newLesson)
      }).then(
        function (response) {
          response.json().then(
            function (json) {
              alert("Success: " + json.acknowledged);
              console.log("Success: " + json.acknowledged);

              lessons.push(newLesson);
            }
          )
        }
      );
    },
    AddToCart: function (lesson) {
      lesson.spaces -= 1;
      this.MyCart.lessons.push(lesson.id);
      console.log(this.MyCart);
    },
    CartedItemSpacesCount(id) {
      let count = 0;
      for (let i = 0; i < this.MyCart.lessons.length; i++) {
        if (this.MyCart.lessons[i] === id) {
          count++;
        }
      }
      return count;
    },
    submitCheckoutForm() {
      if (!this.checkoutOrder.phone || !this.users.email || !this.users.password || !this.checkoutOrder.name) {
        alert('Please make sure all fields are filled!');
        return;
      }
      if (this.MyCart.lessons.length === 0 || this.MyCart.lessons.length == null) {
        alert('Cart is empty');
        return;
      }
      const newUser = {
        "name": this.checkoutOrder.name,
        "email": this.users.email,
        "password": this.users.password
      }
      // // Adding new User
      fetch("https://cst3145coursework2-env.eba-vqei52mg.us-east-1.elasticbeanstalk.com/collections/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser)
      })

      for (let i = 0; i < this.MyCart.lessons.length; i++) {
        const newOrder = {
          "name": this.checkoutOrder.name,
          "phone": this.checkoutOrder.phone,
          "lesson_id": this.MyCart.lessons[i],
          "spaces": "1"
        }
        // // Adding Order into Database
        fetch("https://cst3145coursework2-env.eba-vqei52mg.us-east-1.elasticbeanstalk.com/collections/order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newOrder)
        })
        let MyStore = this;
        // Check Cart Item ID and Lessons ID matched - Updates Lessons
        if (MyStore.lessons.id = this.MyCart.lessons[i]) {
          console.log(this.MyCart.lessons[i]);
          console.log(MyStore.lessons.id);

          // Getting Current Spaces Left from Lesson JSON Object
          let obj = MyStore.lessons.filter(item => item.id === this.MyCart.lessons[i]);
          console.log(obj[0].spaces);

          // Updating Lesson Data
          const newLessonData = {
            "id": MyStore.lessons.id,
            "subjectImg": obj[0].subjectImg,
            "subjectName": obj[0].subjectName,
            "location": obj[0].location,
            "price": obj[0].price,
            "spaces": obj[0].spaces,
            "currency": "£"
          }
          fetch("https://cst3145coursework2-env.eba-vqei52mg.us-east-1.elasticbeanstalk.com/collections/lessons/" + MyStore.lessons.id, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newLessonData)
          })
        } else {
          console.log("Not Matched");
        }

      }
      alert('Order submitted and user account has been registered, Successfully!');
    },
  },
  computed: {
    // Counting Items Count next to Checkout 
    totalItemsInTheCart: function () {
      return this.MyCart.lessons.length || "";
    },
    // Performing search filters in order to perform search
    FilterLessons() {
      if (!this.SearchResultLesson) return this.lessons
      let SearchResultLesson = this.SearchResultLesson.toLowerCase()
      return this.searchResults.filter(l => {
        return l.subjectName.toLowerCase().includes(SearchResultLesson)
      })
    }

  }
}
</script>


<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
