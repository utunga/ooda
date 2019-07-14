<template>
  <div class="loops">
    <section class="loopapp">
      <header class="header">
        <h1>OODA<br/><span class="ooda_loops">LOOPS</span></h1>
        <div class="user_chooser">
          <b>Current User : </b> <div class="radios">
            <input type="radio" name="user" value="linc" id="user-1" v-model="currentUser"><label for="user-1"> Linc </label>
            <input type="radio" name="user" value="miles" id="user-2" v-model="currentUser"><label for="user-2"> Miles </label>
          </div>
        </div>
        <!-- <div class="filter_user_chooser">
          <b>Show : </b> <div class="radios">
            <input type="radio" name="filterUser" value="" id="filter-0" v-model="filterUser"><label for="filter-0"> Both </label>
            <input type="radio" name="filterUser" value="linc" id="filter-1" v-model="filterUser"><label for="filter-1"> Linc </label>
            <input type="radio" name="filterUser" value="miles" id="filter-2" v-model="filterUser"><label for="filter-2"> Miles </label>
          </div>
        </div> -->
        <div class="current_week">
            <b>Week : </b> {{ currentWeek }}
        </div>
        <div class="new-loop">
          <input class="commitment"
                autofocus autocomplete="off"
                placeholder="Propose a loop"
                v-model="newLoop"
                @keyup.enter="addLoop">
          <div class="radios">
              For : <input type="radio" name="proposeFor" value="linc" id="user-11" v-model="proposeFor"><label for="user-11"> Linc </label>
              <input type="radio" name="proposeFor" value="miles" id="user-22" v-model="proposeFor"><label for="user-22"> Miles </label>
          </div>   
        </div>
      </header>
      <section class="main" v-show="loops.length" v-cloak>
        <input class="toggle-all" type="checkbox" v-model="allDone">
        <ul class="loop-list">
          <li v-for="loop in filteredLoops"
              class="loop"
              :key="loop.id"
              :class="{ completed: loop.completed, success: loop.success, fail: !loop.success, editing: loop == editedLoop }">
            <div class="view">
              <div class="success_tick" v-show="loop.completed && loop.success">✓</div>
              <div class="fail_tick" v-show="loop.completed && !loop.success">☠️</div>
              <label @dblclick="editLoop(loop)">{{ loop.title }}
                  <div class="loop_details">
                    <div class="for">For: {{ loop.for }}</div>
                    <div class="week">Opened in week: {{ loop.week }}</div>
                    <div class="week">Status : {{ loop.status }}</div>
                  </div>
              </label>
              <button class="accept" title="Commit to doing this?" v-if="loop.status==='proposed'"  @click="acceptLoop(loop)" ></button>
              <button class="succeed" title="Mark your success!" v-if="loop.status==='open'"  @click="succeedLoop(loop)"></button>
              <button class="cancel" title="Abandon this one" v-if="!loop.completed" @click="cancelLoop(loop)"></button>
           
              <!-- <vue-confirmation-button
                class="remove-confirm"
                title="Remove from record"
                v-if="loop.completed" 
                :messages="['X','Are you sure?','']"
                v-on:confirmation-success="deleteLoop(loop)">
              </vue-confirmation-button> -->
            
            </div>
            <input class="edit" type="text"
                   v-model="loop.title"
                   v-loop-focus="loop == editedLoop"
                   @blur="doneEdit(loop)"
                   @keyup.enter="doneEdit(loop)"
                   @keyup.esc="cancelEdit(loop)">
           
          </li>
        </ul>
      </section>
      <footer class="footer" v-show="loops.length" v-cloak>
    <span class="loop-count">
      <strong>You have {{ remaining }}</strong> open {{ remaining | pluralize }}
    </span>
        <ul class="filters">
          <li><a href="#/all" :class="{ selected: visibility == 'all' }">All</a></li>
          <li><a href="#/proposed" :class="{ selected: visibility == 'proposed' }">Proposed</a></li>
          <li><a href="#/open" :class="{ selected: visibility == 'open' }">Open</a></li>
          <li><a href="#/closed" :class="{ selected: visibility == 'closed' }">Closed</a></li>
          </ul>
        <button class="clear-completed" @click="removeCompleted" v-show="loops.length > remaining">
          Remove completed
        </button>
      </footer>
    </section>
    <footer class="info">
      <p>Double-click to edit a loop</p>
   
      <p>Built with
        <a href="https://vuejs.org" target="_blank">vue</a> and
        <a href="https://feathers-plus.github.io/v1/feathers-vuex" target="_blank">feathers-vuex</a> and
        <a href="https://feathersjs.com" target="_blank">feathers</a>
      </p>
      <p>Source <a href="https://github.com/wdmtech/feathers-vuex-loopmvc" target="_blank">View on GitHub</a></p>
    </footer>
  </div>
</template>

<script>

import vueConfirmationButton from 'vue-confirmation-button';
import LoopsMixin from "@/mixins/LoopsMixin";

// visibility filters
let filters = {
  all(loops) {
    return loops;
  },
  proposed(loops) {
    return loops.filter(function(loop) {
      return loop.status === "proposed";
    });
  },
  open(loops) {
    return loops.filter(function(loop) {
      return loop.status === "open";
    });
  },
  mine(loops, currentUser) {
    return loops.filter(function(loop) {
      return loop.status === "open" && loop.for === currentUser;
    });
  },
  closed(loops) {
    return loops.filter(function(loop) {
      return loop.completed;
    });
  }
};

export default {
  name: "Loops",
  mixins: [LoopsMixin],
  components: {
    'vue-confirmation-button': vueConfirmationButton,
  },
  mounted() {
    // handle routing
    const onHashChange = () => {
      let visibility = window.location.hash.replace(/#\/?/, "");
      console.log(visibility);
      if (filters[visibility]) {
        this.visibility = visibility;
      } else {
        window.location.hash = "";
        this.visibility = "all";
      }
    };

    window.addEventListener("hashchange", onHashChange);
    onHashChange();
  },
  data() {
    return {
      newLoop: "",
      editedLoop: null,
      visibility: "all",
      currentUser: "linc", // or "miles"
      proposeFor: "linc", // or "miles"
      currentWeek: 1
    };
  },
  computed: {
    loops() {
      return this.listLoops;
    },
    filteredLoops() {
      return filters[this.visibility](this.loops, this.currentUser);
    },
    remaining() {
      return filters.mine(this.loops, this.currentUser).length;
    },
    allDone: {
      get() {
        return this.remaining === 0;
      },
      set(value) {
        this.loops.forEach(function(loop) {
          loop.completed = value;
        });
      }
    }
  },
  filters: {
    pluralize(n) {
      return n === 1 ? "item" : "items";
    }
  },
  directives: {
    "loop-focus"(el, binding) {
      if (binding.value) {
        el.focus();
      }
    }
  },
  methods: {
    addLoop() {
      let value = this.newLoop && this.newLoop.trim();
      if (!value) {
        return;
      }

      const { Loop } = this.$FeathersVuex;
      let loop = new Loop({ 
        title: value, 
        status: "proposed",
        success: false,
        completed: false, 
        week: this.currentWeek,
        createdBy: this.currentUser, 
        for: this.proposeFor });
      loop.save({});
      this.visibility = "all";
      this.newLoop = "";
    },
    cancelLoop(loop) {
      if (loop.status === "proposed") {
        loop.remove({});
      }
      else if (loop.status === "open") {
        loop.status = "failed";
        loop.completed = true;
        loop.success = false;
        loop.save({});
      }
    },
    deleteLoop(loop) {
        loop.remove({});
    },
    acceptLoop(loop) {
      if (loop.status === "proposed") {
        loop.status = "open";
        loop.completed = false;
        loop.save({});
      }
    },
    succeedLoop(loop) {
      if (loop.status === "open") {
        loop.status = "succeeded";
        loop.completed = true;
        loop.success = true;
        loop.save({});
      }
    },
    editLoop(loop) {
      this.beforeEditCache = loop.title;
      this.editedLoop = loop;
    },
    doneEdit(loop) {
      if (!this.editedLoop) {
        return;
      }
      this.editedLoop = null;
      loop.title = loop.title.trim();

      loop.save({});

      if (!loop.title) {
        this.removeLoop(loop);
      }
    },
    cancelEdit(loop) {
      this.editedLoop = null;
      loop.title = this.beforeEditCache;
    },
    removeCompleted() {
      this.loops
        .filter(loop => loop.completed)
        .forEach(loop => loop.remove({}));
    }
  }
};
</script>

<style lang="scss">
@import "../styles/loopsmvc_app.scss";
</style>