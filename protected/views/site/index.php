<script src="/app/js/config.js"></script>
<script data-main="app/js/main" src="/app/js/libs/require/require.js"></script>
<script type="text/javascript">
    define('onLoad', ['app'], function(App) {
    <?php if (Yii::app()->user->isGuest): ?>
        App.vent.trigger('webUser:guest');
    <?php else: ?>
        App.addInitializer(function() {
            App.vent.trigger('webUser:init', <?php echo Yii::app()->user->toJSON(); ?>);
        });
    <?php endif; ?>
    });
</script>
