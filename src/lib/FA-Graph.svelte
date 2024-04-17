<script>
    import {FSM} from "$stores/FSM.js";

    let FSM_JSON = $FSM;
    FSM.subscribe(value => {
        FSM_JSON = value;
    });
</script>