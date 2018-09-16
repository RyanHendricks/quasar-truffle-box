<template>
  <q-page padding>
    <center>
      <div style="width: 70%; max-width: 250vw;">
        <p><b>Placeholder</b><br>README</p>
      </div>
    </center>
    <section>
      <center>

        <div class="tbl-header">
          <table>
            <thead>
              <tr>
                <th
                  class="column1"
                  style="text-align:left">Rank</th>
                <th
                  class="column2"
                  style="text-align:center">Message</th>
                <th
                  class="column3"
                  style="text-align:right">Amount</th>
              </tr>
            </thead>
          </table>
        </div>
        <div class="tbl-content">
          <table
            cellpadding="0"
            cellspacing="0"
            border="0">
            <tbody id="tbody"/>
          </table>
        </div>
      </center>
    </section>
    <center>
      <div style="width: 40%; max-width: 250vw;">
        <q-field
          icon="mail"
          color="primary">
          <q-input
            v-model="message"
            float-label="Your Message"
            placeholder="Message"/>
          <q-input
            v-model="amount"
            float-label="Amount of ETH to Send"
            placeholder="Ether"/>
          <br>
        </q-field>

      </div>
      <q-btn
        label="Post Message"
        color="fourth"
        @click="sendMessage" />

    </center>

  </q-page>
</template>

<script>
/*eslint-disable */
export default {
  name: 'sendtx',
  data: () => ({
    msg: '',
    storedData: '',
    lastTxHash: null,
    refreshCount: 0,
    refreshLimit: 60,
    HTMLcontent: null,
    ether: null,
    messages: null
  }),
  mounted: function () {
  },
  created () {
  },
  methods: {
    
  }
}
</script>

<style>

</style>