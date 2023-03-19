<template>
    <div class="container">
        <h1>Checkout Page </h1>

        <h4 class="text-center"><i class="fa-solid fa-cart-shopping" style="margin-top:11px;"></i>
        <b>{{ totalItemsInTheCart }}
            items are in the cart!</b>
        </h4>
        <div class="row">
            <h3>My Cart:</h3>
            <div v-for="lesson in lessons" v-if="MyCart.lessons.includes(lesson.id)" class="col-md-3 col-sm-6 mt-2 box-prod">
                <div class="card">
                    <img v-bind:src="lesson.subjectImg" class="card-img-top" style="width: 120px">
                    <h5 v-text="lesson.subjectName" class="ml-3"></h5>

                    <div class="card-body">
                        <p class="card-text">
                        <p style="margin:0;">Price:{{ lesson.currency }}{{ lesson.price }}</span></p>
                        <p style="margin:0;">Spaces: {{ CartedItemSpacesCount(lesson.id) }}</span></p>
                        <p style="margin:0;">Location: <span v-text="lesson.location"></span></p>
                        </p>
                        <i class="fa-solid fa-minus float-left" style="margin-top:11px;margin-right: 10px;"></i>
                        <input type="button" class="btn btn-default float-left" value="Remove From Cart"
                            v-on:click="RemoveCartItem(lesson)">
                    </div>
                </div>
            </div>
        </div>



        <!-- ---------------------------- Checkout Page -->
        <h1 class="text-center">Register & Checkout Page</h1>

        <p>
            <strong>Your Name:</strong>
            <input type="text" class="form-control" v-model.trim="checkoutOrder.name" required>
        </p>
        <p>
            <strong>email:</strong>
            <input type="text" class="form-control" v-model.trim="users.email" required>
        </p>
        <p>
            <strong>password:</strong>
            <input type="password" class="form-control" v-model.trim="users.password" required>
        </p>
        <p>
            <strong>Phone:</strong>
            <input type="number" class="form-control" v-model="checkoutOrder.phone" required>
        </p>

        <h2 class="text-center">Order Information</h2>

        <p>
            <strong>Name: {{ checkoutOrder.name }}</strong>
        </p>
        <p>
            <strong>email: {{ users.email }}</strong>
        </p>
        <p>
            <strong>password: {{ users.password }}</strong>
        </p>
        <p>
            <strong>Phone: {{ checkoutOrder.phone }}</strong>
        </p>


        <button v-on:click="submitCheckoutForm" class="btn btn-default"> <i class="fa-solid fa-check"></i> Place
            Order</button>
    </div>
</template>


<script>
export default {
    name: 'Checkout',
    props: ["lessons", "searchResults", "imagesBaseURL", "MyCart", "checkoutOrder", "users", "submitCheckoutForm"],
    data() {
        return {}
    },
    methods: {
        CartedItemSpacesCount(id) {
            let count = 0;
            for (let i = 0; i < this.MyCart.lessons.length; i++) {
                if (this.MyCart.lessons[i] === id) {
                    count++;
                }
            }
            return count;
        },
        RemoveCartItem(lesson) {
            for (let i = 0; i < this.MyCart.lessons.length; i++) {
                //Removing Specific ID
                if (this.MyCart.lessons[i] == lesson.id) {
                    //deducting cart count and reverting spaces changes
                    this.MyCart.lessons.splice(i, 1);
                    lesson.spaces += 1;
                    return
                }
            }
        }
    },
    computed: {
        // Counting Items Count next to Checkout 
        totalItemsInTheCart: function () {
            return this.MyCart.lessons.length || "";
        }
    }
}
</script>